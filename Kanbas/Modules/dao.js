import model from "./model.js"; // Adjust the path based on your project structure

export const createModule = async (moduleData) => {
  const newModule = new model(moduleData);
  return await newModule.save();
};

export const findAllModules = async () => {
  return await model.find();
};

export const findModuleById = async (moduleId) => {
  return await model.findById(moduleId);
};

export const findModulesByCourseId = async (courseId) => {
  return await model.find({ course: courseId });
};

export const updateModule = async (moduleId, moduleData) => {
  return await model.updateOne({ _id: moduleId }, { $set: moduleData });
};

export const deleteModule = async (moduleId) => {
  return await model.deleteOne({ _id: moduleId });
};
