var Patientdb = require('../model/patient');

// create and save new patient
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new patient
    const patient = new Patientdb({
        name : req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        dob: req.body.dob,
        age: req.body.age,
        gender: req.body.gender,
        blood_group: req.body.blood_group,
        address: req.body.address,
        disability: req.body.disability,
        image: req.body.image
    })

    // save patient in the database
    patient
        .save(patient)
        .then(data => {
            //res.send(data)
            res.redirect('/add-patient');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all patients/ retrive and return a single patient
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Patientdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found patient with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving patient with id " + id})
            })

    }else{
        Patientdb.find()
            .then(patient => {
                res.send(patient)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving patient information" })
            })
    }
}

// Update a new idetified patient by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Patientdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update patient with ${id}. Maybe patient not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update patient information"})
        })
}

// Delete a patient with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Patientdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Patient was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete patient with id=" + id
            });
        });
}