import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  team: String,
  event: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Registration ||
  mongoose.model("event_register", RegistrationSchema);
