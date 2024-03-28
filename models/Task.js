const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  email: { type: String, ref: 'User' },
  taskname: { type: String, required: true },
  day: String,
  date: Date,
  iscompleted: { type: Boolean, default: false }
});

taskSchema.index({ email: 1, taskname: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Task', taskSchema);
