import planes from './planesModel.js';
import connectDB from '../dbMongo.js';

// Conectar a la base de datos
await connectDB();

/**
 * Función para crear un plan.
 * @param {Object} planData - Los datos del plan (id_plan, Nombre_plan, Precio_plan).
 * @returns {Object} - El plan creado o un error.
 */
export const createPlan = async (planData) => {
  try {
    const newPlan = new planes(planData);
    const savedPlan = await newPlan.save();
    console.log('plan creado:', savedPlan);
    return savedPlan;
  } catch (error) {
    console.error('Error al crear el plan:', error);
    throw error;
  }
};

/**
 * Función para obtener todos los planes.
 * @returns {Array} - Lista de todos los planes en la colección.
 */
export const readAllPlans = async () => {
  try {
    const plans = await Planes.find({});
    console.log('Planes encontrados:', plans);
    return plans;
  } catch (error) {
    console.error('Error al obtener los planes:', error);
    throw error;
  }
};

