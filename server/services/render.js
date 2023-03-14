const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/patient
    axios.get('http://localhost:3000/api/patient')
        .then(function(response){
            res.render('index', { patient : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

exports.add_patient = (req, res) =>{
    res.render('add-patient');
}

exports.update_patient = (req, res) =>{
    axios.get('http://localhost:3000/api/patient', { params : { id : req.query.id }})
        .then(function(patientdata){
            res.render("update-patient", {patient :patientdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}