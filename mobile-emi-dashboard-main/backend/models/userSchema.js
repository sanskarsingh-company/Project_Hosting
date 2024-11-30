const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String
    },
    phone:{
        type: Number
    },
    address: {
        type: String
    },
    devices: [{
        deviceName: String,
        price: Number,
        downPayment: Number,
        emiTenure: Number,
        interestRate: Number,
        emiDetails: [{
            dueDate: Date,
            amount: Number,
            status: {
                 type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' 
            },
            penalty: {
                type: Number,
                default: 0
            },
            paymentDate: Date
        }]
    }],
    
});



const User = mongoose.model("User", userSchema);
module.exports = User