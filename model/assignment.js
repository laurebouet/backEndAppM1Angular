let mongoose = require('mongoose');
let aggregatePaginate = require('mongoose-aggregate-paginate-v2');

let Schema = mongoose.Schema;

let AssignmentSchema = new Schema({
  id: Number,
  dateDeRendu: Date,
  nom: String,
  rendu: Boolean
});

AssignmentSchema.plugin(aggregatePaginate);

let Assignment = mongoose.model('Assignment', AssignmentSchema);

module.exports = Assignment;