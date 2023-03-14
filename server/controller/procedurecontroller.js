var Proceduredb = require('../model/procedure');

// create and save new procedure
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new procedure
    const procedure = new Proceduredb({
        name : req.body.name,
        duration: req.body.duration,
        started: req.body.started,
        stopped: req.body.stopped,
        price: req.body.price,
        patient: req.body.patient,
        doctor: req.body.doctor,
        notes: req.body.notes
    })

    // save procedure in the database
    procedure
        .save(procedure)
        .then(data => {
            //res.send(data)
            res.redirect('/add-procedure');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all procedures/ retrieve and return a single procedure
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Proceduredb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found procedure with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving procedure with id " + id})
            })

    }else{
        Proceduredb.find()
            .then(procedure => {
                res.send(procedure)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retrieving procedure information" })
            })
    }
}

// Update a new idetified procedure by id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Proceduredb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update procedure with ${id}. Procedure not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update procedure information"})
        })
}

// Delete a procedure with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Proceduredb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}.id is invalid`})
            }else{
                res.send({
                    message : "Procedure was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete procedure with id=" + id
            });
        });
}