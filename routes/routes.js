const express = require('express');
const {signup,login,logout}=require("../controllers/AuthController.js")
const {getUser,authUser} = require("../controllers/UserController");
const { verifyToken } = require('../middlewares/VerifyToken.js');
const { refreshToken } = require('../middlewares/RefreshToken.js');
const { checkUser } = require('../middlewares/CheckUser.js');
const { getSkills, addSkill,removeSkill,uploadImage } = require('../controllers/SkillsController.js');
const { getProjects, addProject, removeProject, updateProject } = require('../controllers/ProjectController.js');
const { contact } = require('../controllers/OtherController.js');
const { GenerateSignature, generateSignature } = require('../middlewares/GenerateSignature.js');
const router= express.Router();


// authentication routes 

router.post('/signup',signup);
router.post('/login',login)
router.get('/logout',logout)

// user router 

router.get("/getUser", getUser);
router.get('/authUser', verifyToken,authUser);
router.get("/refresh",refreshToken,verifyToken,authUser);
router.get('/checkUser',checkUser);


// skill routes 
router.get("/getSkill",getSkills );
router.post('/addSkill',addSkill);
router.delete('/removeSkill/:id',removeSkill);


// project routes 
router.get('/getProjects',getProjects);
router.post('/addProject',addProject)
router.delete('/removeProject/:id',removeProject);
router.put('/updateProject/:id',updateProject);


// other routes 


router.post('/contact',contact)
router.get('/signature',generateSignature);

module.exports=router;