import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Donor from "./models/donor.model.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Default route
app.get("/", (req, res) => {
  res.send("Amar Rokto server is running!");
});

// Get donors API
app.get("/donors", async (req, res) => {
  try {
    const allDonors = await Donor.find();
    res.status(200).json(allDonors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch donors" });
  }
});

// GET donor by ID
app.get("/donors/:id", async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: "Donor not found" });

    res.status(200).json(donor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donor", error });
  }
});

// CREATE a new donor
app.post("/donors", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json({ success: true, donor });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
