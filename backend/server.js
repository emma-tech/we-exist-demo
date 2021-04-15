import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import cloudinaryFramework from "cloudinary";
import multer from "multer";
import cloudinaryStorage from "multer-storage-cloudinary";
import dotenv from "dotenv";

const nodemailer = require("nodemailer");

dotenv.config();

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/we-exist-api";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

// Setup for Cloudinary ------------------------------
const cloudinary = cloudinaryFramework.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = cloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile_pictures",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 400, height: 400, crop: "limit" }],
  },
});

const parser = multer({ storage });

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(bodyParser.json());

// Added schema to be able to make validation on choosen password and not hashed value
const candidateSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 15,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 20,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    // max: 12
  },
  location: {
    type: String,
    required: true,
    maxlength: 30,
  },
  title: {
    type: String,
    required: true,
    maxlength: 30,
  },
  skills: {
    type: Array,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 250,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  imageUrl: {
    type: String,
  },
  acceptedTerms: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
    unique: true,
  },
});

candidateSchema.pre("save", async function (next) {
  const candidate = this;
  if (!candidate.isModified("password")) {
    return next();
  }
  const salt = bcrypt.genSaltSync();
  candidate.password = bcrypt.hashSync(candidate.password, salt);

  next();
});

const authenticateUser = async (req, res, next) => {
  try {
    const accessToken = req.header("Authorization");
    const candidate = await Candidate.findOne({ accessToken });

    if (candidate) {
      req.candidate = candidate; // have access to req.candidate in endpoint
    } else {
      throw "Candidate not found!";
    }
    next();
  } catch (err) {
    res.status(401).json({
      message: "Please try logging in again",
      error: err,
    });
  }
};

// Candidate Model ------------------------------------
const Candidate = mongoose.model("Candidate", candidateSchema);

// ROUTES ---------------------------------------------
app.get("/", (req, res) => {
  res.send("Welcome to We Exist!");
});

// Endpoint to GET all the candidates -----------------------------
app.get("/candidates", async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(400).json({
      message: "Could not find candidates",
      error: err,
    });
  }
});

// Endpoint to POST / register a new candidate ---------------------
app.post("/candidates", parser.single("imageUrl"), async (req, res) => {
  try {
    const candidate = await new Candidate({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      location: req.body.location,
      title: req.body.title,
      skills: [req.body.skillOne, req.body.skillTwo, req.body.skillThree],
      experience: req.body.experience,
      description: req.body.description,
      password: req.body.password,
      imageUrl: req.file.path,
      acceptedTerms: req.body.acceptedTerms,
    }).save();

    res.status(200).json({
      firstName: candidate.firstName,
      candidateId: candidate._id,
      imageUrl: candidate.imageUrl,
    });
  } catch (err) {
    res.status(400).json({
      message: "Could not create candidate",
      error: err,
    });
  }
});

// Endpoint to login to user profile -------------------------------
app.post("/sessions", async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await Candidate.findOne({ email });

    if (candidate && bcrypt.compareSync(password, candidate.password)) {
      res.status(200).json({
        candidateId: candidate._id,
        accessToken: candidate.accessToken,
      });
    } else {
      throw "Candidate not found";
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// Endpoint to access user information ------------------------------
app.get("/candidates/:id", authenticateUser);
app.get("/candidates/:id", (req, res) => {
  try {
    const candidateId = req.params.id;
    if (candidateId != req.candidate._id) {
      throw "Access denied";
    }
    const candidate = req.candidate;

    res.status(200).json({ candidate });
  } catch (err) {
    res.status(403).json({ error: err });
  }
});

// Endpoint to EDIT user profile information -------------------------
app.patch("/candidates/:id", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    location,
    title,
    skillOne,
    skillTwo,
    skillThree,
    experience,
    description,
  } = req.body;

  try {
    await Candidate.updateOne(
      { _id: req.params.id },
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        location: location,
        title: title,
        skills: [skillOne, skillTwo, skillThree],
        experience: experience,
        description: description,
      }
    );

    res.status(200).json({ message: "Candidate information updated" });
  } catch (err) {
    res.status(400).json({
      message: "Could not update information, try again",
      error: err,
    });
  }
});

// Endpoint to EDIT user IMAGE -------------------------
app.patch(
  "/candidate/image/:id",
  parser.single("imageUrl"),
  async (req, res) => {
    try {
      await Candidate.updateOne(
        { _id: req.params.id },
        {
          imageUrl: req.file.path,
        }
      );

      res.status(200).json({ message: "Candidate image updated" });
    } catch (err) {
      res.status(400).json({
        message: "Could not update image, try again",
        error: err,
      });
    }
  }
);

// Endpoint to DELETE user profile ------------------------------
app.delete("/candidates/:id", async (req, res) => {
  try {
    await Candidate.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Candidate deleted from database" });
  } catch (err) {
    res.status(400).json({
      message: "Delete not possible",
      error: err,
    });
  }
});

//-----------  Code for node-mailer --------------------
const transport = {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(transport);

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const mail = {
    from: name,
    to: "weexist.web@gmail.com",
    subject: "New Message from Contact Form",
    html: `<p>Message from: ${name}</p> ${email}</p><p> ${message}</p>`,
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });
      transporter.sendMail({
        from: "weexist.web@gmail.com",
        to: email,
        subject: "Thank you for contacting us!",
        text: `Hello ${name}! Thank you for contacting us at We Exist. We will get back to you as soon as we can.\n\nYour contact details:\n Name: ${name}\n Email: ${email}\n Message: ${message}`,
      });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
