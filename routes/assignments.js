let express = require('express');
let router = express.Router();
let Assignment = require('../model/assignment');



// Récupérer tous les assignments (GET)
function getAssignments(req, res) {
  let aggregateQuery = Assignment.aggregate();
  let options = {
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 10
  };

  Assignment.aggregatePaginate(aggregateQuery, options, (err, assignments) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(assignments);
  });
}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
  let assignment = new Assignment();
  assignment.id = req.body.id;
  assignment.nom = req.body.nom;
  assignment.dateDeRendu = req.body.dateDeRendu;
  assignment.rendu = req.body.rendu;

  console.log('POST assignment reçu :');
  console.log(assignment);

  assignment.save(err => {
    if (err) {
      return res.status(500).send('cant post assignment ', err);
    }
    res.json({ message: `${assignment.nom} saved!` });
  });
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
  let assignmentId = req.params.id;

  Assignment.findOne({ id: assignmentId }, (err, assignment) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!assignment) {
      return res.status(404).send('Assignment not found');
    }
    res.json(assignment);
  });
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
  console.log('UPDATE recu assignment : ');
  console.log(req.body);

  Assignment.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, assignment) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: 'updated' });
  });
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
  Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!assignment) {
      return res.status(404).send('Assignment not found');
    }
    res.json({ message: `${assignment.nom} deleted` });
  });
}

module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };


// let Assignment = require('../model/assignment');

// let mongoose = require('mongoose');
// var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

// var Schema = mongoose.Schema;


// let AssignmentSchema = new Schema({
//     id: Number,
//     dateDeRendu: Date,
//     nom: String,
//     rendu: Boolean
// });



// AssignmentSchema.plugin(aggregatePaginate);

// module.exports = mongoose.model('Assignment', AssignmentSchema);

// // Récupérer tous les assignments (GET)
// function getAssignments(req, res) {
//     let aggregateQuery = Assignment.aggregate();
//     let options = {
//       page: parseInt(req.query.page) || 1,
//       limit: parseInt(req.query.limit) || 10
//     };
  
//     Assignment.aggregatePaginate(aggregateQuery, options, (err, assignments) => {
//       if (err) {
//         return res.status(500).send(err);
//       }
//       res.json(assignments);
//     });
//   }
// // function getAssignments(req, res){

// //     var aggregateQuery = Assignment.aggregate();

// //     Assignment.aggregatePaginate(
// //         aggregateQuery , 
// //         {
// //             page : parseInt(req.query.page) || 1,
// //             limit : parseInt(req.query.limit) || 10,
// //         },
// //         (err, assignments) => {
// //             if(err){
// //                 res.send(err)
// //             }
// //             res.send(assignments);
// //         }
// //     );
// //     }

// //     Assignment.find((err, assignments) => {
// //         if(err){
// //             res.send(err)
// //         }

// //         res.send(assignments);
// //     });
// // }

// // Récupérer un assignment par son id (GET)
// // function getAssignment(req, res){
// //     let assignmentId = req.params.id;

// //     Assignment.findOne({id: assignmentId}, (err, assignment) =>{
// //         if(err){res.send(err)}
// //         res.json(assignment);
// //     })
// // }

// // Ajout d'un assignment (POST)
// function postAssignment(req, res){
//     let assignment = new Assignment();
//     assignment.id = req.body.id;
//     assignment.nom = req.body.nom;
//     assignment.dateDeRendu = req.body.dateDeRendu;
//     assignment.rendu = req.body.rendu;

//     console.log("POST assignment reçu :");
//     console.log(assignment)

//     assignment.save( (err) => {
//         if(err){
//             res.send('cant post assignment ', err);
//         }
//         res.json({ message: `${assignment.nom} saved!`})
//     })
// }

// // Update d'un assignment (PUT)
// function updateAssignment(req, res) {
//     console.log("UPDATE recu assignment : ");
//     console.log(req.body);
//     Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
//         if (err) {
//             console.log(err);
//             res.send(err)
//         } else {
//           res.json({message: 'updated'})
//         }

//       // console.log('updated ', assignment)
//     });

// }

// // suppression d'un assignment (DELETE)
// function deleteAssignment(req, res) {

//     Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json({message: `${assignment.nom} deleted`});
//     })
// }



// module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
