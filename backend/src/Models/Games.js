import { Schema, model } from "mongoose";

const GameSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    minBet: {
      type: Number,
      required: true,
      min: 0,
    },
    maxBet: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);


export default model("Games", GameSchema);
