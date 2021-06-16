const { Router } = require('express');
const router = Router();
const models = require('../database/models/');
const response = require('../utils/response');
const cloudinary = require("../utils/cloudinary");


router.delete("/cloudinary/:id", async (req, res) => {
  const imageId = req.params.id;
  try {
    await cloudinary.uploader.destroy(imageId);
    response.success(req, res, {mesage: "Cloudinary image deleted."})
  } catch (error) {
    response.error(req, res, error)
  }
})

module.exports = router;