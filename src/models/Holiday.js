import mongoose from "mongoose";

const HolidaySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Holiday title is required."],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, "Holiday date is required."],
  },
  type: {
    type: String,
    enum: {
      values: ["National", "Festival", "Optional", "Religious", "Regional"],
      message: "{VALUE} is not a valid holiday type."
    },
    required: [true, "Holiday type is required."],
  },
  region: {
    type: String,
    default: "All",
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, "Description must not exceed 200 characters."]
  }
}, {
  timestamps: true
});

HolidaySchema.index({ title: 1, date: 1 }, { unique: true });

export default mongoose.models.Holiday || mongoose.model("Holiday", HolidaySchema);