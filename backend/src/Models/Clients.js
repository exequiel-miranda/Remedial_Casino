
import { Schema, model } from "mongoose";

const ClientsSchema = new Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
    type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
      min: 0,
    },
    country: {
    type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Clients", ClientsSchema);