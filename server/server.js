const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const userRegisterFoodPage = require("./schema/user");
app.use(express.json());

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ContactList", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });
    console.log("Connected to mongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

connectDB();

app.get("/", (req, res) => {
  res.end("Hi welcome");
});

app.post("/userregister", async (req, res) => {
  console.log(req.body);
  try {
    const phoneNumberExist = await userRegisterFoodPage.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    const mailExist = await userRegisterFoodPage.findOne({
      email: req.body.email,
    });

    if (phoneNumberExist) {
      return res
        .status(400)
        .send("Phone number already exists. Try with a new number or login.");
    }

    if (mailExist) {
      return res
        .status(400)
        .send("Email already exists. Try with a new email or login.");
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;

    const newUserRegister = await userRegisterFoodPage.create(req.body);
    console.log(newUserRegister);
    return res.status(201).send("User added successfully");
  } catch (error) {
    console.error("Error adding user:", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  const { phoneNumber, password } = req.body;
  try {
    const user = await userRegisterFoodPage.findOne({
      phoneNumber: phoneNumber,
    });
    if (!user) {
      return res.status(404).send("PhoneNumber not found.");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      return res.status(200).send("Login successful.");
    } else {
      return res.status(401).send("Incorrect password.");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).send("Internal Server Error");
  }
});

app.get("/getuser", async (req, res) => {
  try {
    const viewUser = await userRegisterFoodPage.deleteMany();
    res.status(200).send(viewUser);
  } catch (error) {
    res.status(500).send(error);
    console.error("Error adding user:", error);
  }
});

app.listen(PORT, () => console.log(`SERVER is running in ${PORT}`));
