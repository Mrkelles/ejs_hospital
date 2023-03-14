const express = require('express');
const route = express.Router()

const services = require('../services/render');
const patientcontroller = require('../controller/patientcontroller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add patients
 *  @method GET /add-patient
 */
route.get('/add-patient', services.add_patient)

/**
 *  @description for update patient
 *  @method GET /update-patient
 */
route.get('/update-patient', services.update_patient)


// API
route.post('/api/patients', patientcontroller.create);
route.get('/api/patients', patientcontroller.find);
route.put('/api/patients/:id', patientcontroller.update);
route.delete('/api/patients/:id', patientcontroller.delete);


module.exports = route