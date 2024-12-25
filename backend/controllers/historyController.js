const RideHistory = require("../models/History");
const User = require("../models/User");

const getRideByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const validStatus = ["completed", "canceled", "in-progress"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const rides = await RideHistory.find({ status });
    res.status(200).json({ rides });
  } catch (err) {
    console.error("Error fetching rides:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createTrip = async (req, res) => {
  try {
    const { driverId, customerId, pickupLocation, dropoffLocation, rideCost } = req.body;

    const driver = await User.findOne({ _id: driverId, isDriver: true });
    if (!driver) {
      return res.status(400).json({ message: "Driver not found or not a driver" });
    }

    const customer = await User.findOne({ _id: customerId, role: "customer" });
    if (!customer) {
      return res.status(400).json({ message: "Customer not found or not a customer" });
    }

    const newRide = new RideHistory({
      driverId,
      customerId,
      pickupLocation,
      dropoffLocation,
      rideCost,
      status: "in-progress",
      pickupPhoto: req.file ? req.file.path : null,
    });

    await newRide.save();
    res.status(201).json({ message: "Ride created successfully", ride: newRide });
  } catch (err) {
    console.error("Error creating ride:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateTrip = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { status, pickupLocation, dropoffLocation, rideCost } = req.body;

    const trip = await RideHistory.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (status) trip.status = status;
    if (pickupLocation) trip.pickupLocation = pickupLocation;
    if (dropoffLocation) trip.dropoffLocation = dropoffLocation;
    if (rideCost !== undefined) trip.rideCost = rideCost;

    await trip.save();
    res.status(200).json({ message: "Trip updated successfully", trip });
  } catch (err) {
    console.error("Error updating trip:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const tripCanceled = async (req, res) => {
  try {
    const { tripId } = req.params;

    const trip = await RideHistory.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (trip.status === "completed") {
      return res.status(400).json({ message: "Cannot cancel a completed trip" });
    }

    if (trip.status === "canceled") {
      return res.status(400).json({ message: "Trip is already canceled" });
    }

    trip.status = "canceled";
    await trip.save();
    res.status(200).json({ message: "Trip canceled successfully", trip });
  } catch (err) {
    console.error("Error canceling trip:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getRideByStatus, createTrip, updateTrip, tripCanceled };
