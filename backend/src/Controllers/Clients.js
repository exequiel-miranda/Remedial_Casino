import bcrypt from "bcryptjs";
import clientsModel from "../models/Clients.js";

const clientsController = {};


clientsController.getClients = async (req, res) => {
  const Clients = await clientsModel.find();
  res.json(Clients);
};


clientsController.createClients = async (req, res) => {
  try {
    const { fullName, email, password, age, country } = req.body;
    const existingClients = await clientsModel.findOne({ email });
    if (existingClients) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newClients = new clientsModel({
      fullName,
      email,
      password: hashedPassword,
      age,
      country,
    });

    await newClients.save();

    res.json({ message: "Client saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

clientsController.deleteClients = async (req, res) => {
  const deletedClients = await clientsModel.findByIdAndDelete(req.params.id);
  if (!deletedClients) {
    return res.status(404).json({ message: "Client not found" });
  }
  res.json({ message: "Clients deleted successfully" });
};

clientsController.updateClients = async (req, res) => {
  try {
    const { fullName, email, password, age, country } = req.body;

    const updateData = { fullName, email, age, country };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }

    await clientsModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

    res.json({ message: "Clients updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export default clientsController;
