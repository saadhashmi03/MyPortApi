const mongoose=require('mongoose')

const ProjectSchema= new mongoose.Schema({
    name:String,
    desc:String,
    img:String, // img = secure-url from cloudinary
    githubUrl: String,
    hostedUrl: String,
    publicId: String,  // publicId = public_id from cloudinary 
    deleteToken:String, // deleteToken = delete_token form cloudinary
},
{timestamps:true}

);
module.exports = mongoose.model("Project",ProjectSchema)