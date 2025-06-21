import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
});

const Data = mongoose.model('Data', dataSchema);
export default Data;
    