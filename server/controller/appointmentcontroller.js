var Appointmentdb = require('../model/appointment');

// create and save new appointment
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new appointment
    const appointment = new Appointmentdb({
        name : req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        age: req.body.age,
        gender: req.body.gender,
        address: req.body.address,
        dept: req.body.dept,
        image: req.body.image
    })

    // save appointment in the database
    appointment
        .save(appointment)
        .then(data => {
            //res.send(data)
            res.redirect('/add-appointment');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all appointments/ retrive and return a single appointment
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Appointmentdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found appoinment with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving appoinment with id " + id})
            })

    }else{
        Appointmentdb.find()
            .then(appointment => {
                res.send(appointment)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retrieving appoinment information" })
            })
    }
}

// Update a new idetified appointment by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Appointmentdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update appointment with ${id}. Doctor not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update appointment information"})
        })
}

// Delete an appointment with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Appointmentdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot Delete with id ${ id }. Maybe id is wrong` })
            } else {
                res.send({
                    message: "Appointment was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete appointment with id=" + id
            });
        });
}