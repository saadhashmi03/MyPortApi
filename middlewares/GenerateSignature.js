const cloudinary = require("cloudinary");


cloudinary.v2.config({
  cloud_name: "dfolqygpk",
  api_key: "379511757393755",
  api_secret: "JT41JDXZKvci2zTzKvn0T9g5LVo",
});

exports.generateSignature = async (req, res) => {
  const { public_id } = req.query;
  const signature = await cloudinary.v2.utils.api_sign_request(
    {
      public_id,
      timestamp: Math.floor((new Date().getTime() + 31536000000) / 1000)

    },
    "JT41JDXZKvci2zTzKvn0T9g5LVo"
  );

  return res.status(200).json({ signature})
};

 

