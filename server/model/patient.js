const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema({
    name: { type: String, required: true },
    email:{type: Number, required: true},
    phone_number: { type: String, required: true },
    dob: { type: Number, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    blood_group: { type: String, required: true }, 
    address: { type: String, required: true },
    disability: { type: String, required: true },
    image: { type: String, required: false },
 
});

const Patientdb = mongoose.model("Patientdb", PatientSchema);

module.exports = Patientdb;
