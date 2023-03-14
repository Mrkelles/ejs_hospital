const mongoose = require("mongoose");

const ProcedureSchema = mongoose.Schema({
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    started: { type: Number, required: false },
    stopped:{type: Number, required: false},
    price: { type: Number, required: true },
    patient: { type: String, required: false },
    doctor: { type: String, required: true },
    notes: { type: String, required: false },
});

const Proceduredb = mongoose.model("Proceduredb", ProcedureSchema);

module.exports = Proceduredb;
