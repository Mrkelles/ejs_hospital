const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
    patient: { type: String, required: true },
    doctor:{type: String, required: false },
    duration: { type: Number, required: false },
    date: { type: String, required: true },
    time: { type: String, required: true },
    dept: { type: String, required: false },
    notes: { type: String, required: true },
});

const Appointmentdb = mongoose.model("Appointmentdb", AppointmentSchema);

module.exports = Appointmentdb;
