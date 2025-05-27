import { Schema, model } from "mongoose";

const GameSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    minBet: {
      type: Number,
      require: true,
      min: 0,
    },
    maxBet: {
      type: Number,
      require: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Games", GameSchema);
