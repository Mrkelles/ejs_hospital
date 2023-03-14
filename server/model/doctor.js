const mongoose = require("mongoose");

const DoctorSchema = mongoose.Schema({
    name: { type: String, required: true },
    email:{type: Number, required: true},
    phone_number: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    dept: { type: String, required: true },
    image: { type: String, required: false },
});

const Doctordb = mongoose.model("Doctordb", DoctorSchema);

module.exports = Doctordb;
