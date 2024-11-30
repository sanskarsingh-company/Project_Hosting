const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const { authMiddleware } = require('./auth');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

router.use(cookieParser());


router.post("/addUser", authMiddleware(), async (req, res) => {
  const {
    name,
    email,
    phone,
    address,
    deviceName,
    price,
    downPayment,
    emiTenure,
    interestRate,
  } = req.body;

  if (
    !name ||
    !email ||
    !phone ||
    !address ||
    !deviceName ||
    !price ||
    !downPayment ||
    !emiTenure ||
    !interestRate
  ) {
    return res.status(422).json({ error: "Please fill all the details." });
  }

  try {
    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ error: "User with this email already exists." });
    }

    // Convert interest rate from percentage to decimal and calculate monthly interest rate
    const annualInterestRate = interestRate / 100; // e.g., 1% becomes 0.01
    const monthlyInterestRate = annualInterestRate / 12;

    // Loan Amount (Remaining after down payment)
    const remainingAmount = price - downPayment;

    // EMI Calculation using standard formula
    const monthlyEMI = Math.round(
      (remainingAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, emiTenure)) /
        (Math.pow(1 + monthlyInterestRate, emiTenure) - 1)
    );

    // Create EMI Details
    const emiDetails = [];
    const startDate = new Date();

    for (let i = 1; i <= emiTenure; i++) {
      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + i);
      emiDetails.push({
        dueDate,
        amount: monthlyEMI,
        status: "Unpaid",
        penalty: 0,
      });
    }

    // Create new user if doesn't exist
    const newUser = new User({
      name,
      email,
      phone,
      address,
      devices: [
        {
          deviceName,
          price,
          downPayment,
          emiTenure,
          interestRate,
          emiDetails,
        },
      ],
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});



router.post("/addDevice/:id", authMiddleware(), async (req, res) => {
  const { deviceName, price, downPayment, emiTenure, interestRate } = req.body;
  const userId = req.params.id;

  if (!deviceName || !price || !downPayment || !emiTenure || !interestRate) {
    return res.status(422).json({ error: "Fill all the device details" });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the device with the same name already exists
    const existingDevice = user.devices.find(
      (device) => device.deviceName === deviceName
    );

    if (existingDevice) {
      return res.status(422).json({ error: "Device with the same name already exists" });
    }

    // Parse the input values to ensure they are numbers
    const parsedPrice = parseFloat(price);
    const parsedDownPayment = parseFloat(downPayment);
    const parsedEmiTenure = parseInt(emiTenure);
    const parsedInterestRate = parseFloat(interestRate);

    if (
      isNaN(parsedPrice) ||
      isNaN(parsedDownPayment) ||
      isNaN(parsedEmiTenure) ||
      isNaN(parsedInterestRate)
    ) {
      return res.status(400).json({
        error: "Invalid data for price, down payment, emi tenure, or interest rate",
      });
    }

    // Loan Amount (Remaining after down payment)
    const remainingAmount = parsedPrice - parsedDownPayment;

    // EMI Calculation using standard formula
    const annualInterestRate = parsedInterestRate / 100;
    const monthlyInterestRate = annualInterestRate / 12;
    const monthlyEMI = Math.round(
      (remainingAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, parsedEmiTenure)) /
        (Math.pow(1 + monthlyInterestRate, parsedEmiTenure) - 1)
    );

    // Generate EMI details
    const emiDetails = [];
    const startDate = new Date();
    for (let i = 1; i <= parsedEmiTenure; i++) {
      const dueDate = new Date(startDate);
      dueDate.setMonth(startDate.getMonth() + i);
      emiDetails.push({
        dueDate,
        amount: monthlyEMI,
        status: "Unpaid",
        penalty: 0,
      });
    }

    // Add the new device to the user's devices array
    user.devices.push({
      deviceName,
      price: parsedPrice,
      downPayment: parsedDownPayment,
      emiTenure: parsedEmiTenure,
      interestRate: parsedInterestRate,
      emiDetails,
    });

    // Save the updated user
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});


router.get("/getAllUserDetails", authMiddleware(), async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users from the database
    res.status(200).json(users); // Return the list of users as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});


router.get("/getUserDetails/:id", authMiddleware(), async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Find user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user); // Return user details as JSON response
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user details" });
  }
});


// Delete a user by ID
router.delete("/deleteUser/:id", authMiddleware('admin'), async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

router.get("/check-session", (req, res) => {
  const token = req.cookies.token; // Assuming token is stored in cookies
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ role: decoded.role }); // Return the user's role
  } catch (error) {
    res.status(401).json({ message: "Invalid session" });
  }
});

router.put('/updateEmiStatus/:emiId', async (req, res) => {
  try {
    const { emiId } = req.params;  // Assuming emiId is passed as a parameter
    const { status } = req.body;   // Status (Paid/Unpaid) will come from the request body

    // Find the user and update the corresponding EMI status
    const user = await User.findOne({ 'devices.emiDetails._id': emiId });
    if (!user) {
      return res.status(404).json({ message: 'EMI not found' });
    }

    // Update the EMI status
    const device = user.devices.find(device =>
      device.emiDetails.some(emi => emi._id.toString() === emiId)
    );
    const emi = device.emiDetails.find(emi => emi._id.toString() === emiId);
    emi.status = status; // Update the EMI status

    await user.save(); // Save the updated user

    res.status(200).json({ message: 'EMI status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
})

router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production" });
  res.status(200).json({ message: "Logged out successfully" });
});


module.exports = router;
