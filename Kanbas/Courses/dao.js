import model from "./model.js"; // Ensure this path matches your file structure

export const createCourse = async (courseData) => {
  const newCourse = new model(courseData);
  return await newCourse.save();
};

export const findAllCourses = async () => {
  return await model.find();
};

export const findCourseById = async (courseId) => {
  return await model.findById(courseId);
};

export const updateCourse = async (courseId, courseData) => {
  return await model.updateOne({ _id: courseId }, { $set: courseData });
};

export const deleteCourse = async (courseId) => {
  return await model.deleteOne({ _id: courseId });
};
