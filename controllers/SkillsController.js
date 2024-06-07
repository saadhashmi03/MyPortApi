const Skill=require('../models/SkillModel')

exports.getSkills= async(req,res)=>{
    try {
        const skills= await Skill.find();
        if(!skills)
        return res.status(404).json({success:false,msg:"skills not found"})
    res.status(200).json({success:true,skills})
        
    } catch (error) {
        return res.status(500).json({success:true,msg:error.message});

    };

}
exports.addSkill= async(req,res)=>{
    const {skill,level}=req.body;
    try {
        const newSkill= await Skill.create({skill,level})
        await newSkill.save();
        return res.status(201).json({success:true,msg:"new skill added"})
    } catch (error) {
        res.status(500).json({success:false,msg:error.message});

    }
}

exports.removeSkill = async (req, res) => {
    const { id } = req.params;
  
    try {
      const skill = await Skill.findByIdAndDelete(id);
      if (!skill) {
        return res.status(404).json({ success: false, msg: "Skill not found" });
      }
      res.status(200).json({ success: true, msg: "Skill deleted successfully" });
    } catch (error) {
      return res.status(501).json({ success: false, msg: error.message });
    }
  };
  