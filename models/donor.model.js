import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    photoURL: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    lastDonationDate: { type: String, required: true },
  },
  { timestamps: true }
);

const Donor = mongoose.model("Donor", donorSchema);

export default Donor;
