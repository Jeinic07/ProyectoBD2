import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  id_plan: { type: Number, required: true, unique: true },
  Nombre_plan: { type: String, required: true },
  Precio_plan: { type: Number, required: true },
});

const Plan = mongoose.model('planes', planSchema);

export default Plan;
