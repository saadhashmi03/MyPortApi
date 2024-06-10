const Project = require("../models/ProjectModel");

exports.getProjects = async (req, res) => {
  try {
    const project = await Project.find();
    if (!project)
      return res.status(404).json({ success: false, msg: "Project not found" });
    return res.status(200).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
    
    


  }
};

exports.addProject = async (req, res) => {
  const { name, desc, githubUrl, hostedUrl, secureUrl, publicId, deleteToken } =
    req.body;
  try {
    if (!name || !desc) {
      return res
        .status(400)
        .json({ success: false, msg: "Please fill all the  fields" });
    }
    const newProject = await Project.create({
      name,
      desc,
      githubUrl,
      hostedUrl,
      img: secureUrl,
      publicId,
      deleteToken,
    });
    await newProject.save();
    return res
      .status(201)
      .json({ success: true, msg: "New Project added successfully" });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

exports.removeProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, msg: "Project not found" });
    }
    return res.status(200).json({ success: true, msg: "Project deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: `Failed to delete: ${error.message}` });
  }
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;

  const updatedData = req.body; // get all the data from the request body

  try {
    let project = await Project.findById(id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, msg: "project not found " });
    }
    // check if the "img " property exists in updatedData and has a value is
    if (updatedData.img) {
      project.img = updatedData.img;

    }

    // directly se the other fields of the project object from updatedData

    for (const key in updatedData) {
      if (key !== "img") {
        project[key] = updatedData[key];
      }
    }
    await project.save();
    return res
      .status(200)
      .json({ success: true, msg: "Project Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};
