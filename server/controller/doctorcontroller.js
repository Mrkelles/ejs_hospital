var Doctordb = require('../model/doctor');

// create and save new doctor
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new doctor
    const doctor = new Doctordb({
        name : req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        age: req.body.age,
        gender: req.body.gender,
        address: req.body.address,
        dept: req.body.dept,
        image: req.body.image
    })

    // save doctor in the database
    doctor
        .save(doctor)
        .then(data => {
            //res.send(data)
            res.redirect('/add-doctor');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all doctors/ retrieve and return a single doctor
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Doctordb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found doctor with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving doctor with id " + id})
            })

    }else{
        Doctordb.find()
            .then(doctor => {
                res.send(doctor)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving doctor information" })
            })
    }
}

// Update a new idetified doctor by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Doctordb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update doctor with ${id}. Doctor not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update doctor information"})
        })
}

// Delete a doctor with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Doctordb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Doctor was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete doctor with id=" + id
            });
        });
}