const { Router } = require('express');
const router = Router();
const models = require('../database/models/');
const response = require('../utils/response');
const cloudinary = require("../utils/cloudinary");
const { Op } = require("sequelize");

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const image = await models.Image.findOne({ where: {url: { [Op.like]: `%${id}%` }}});
    
    if (!image) return response.success(req, res, { message: "Image not found." }, 404);

    await image.destroy();
    response.success(req, res, { message: "Image deleted successfully." });
  } catch (error) {
    response.error(req, res, error);
  }
})

router.delete("/cloudinary/:id", async (req, res) => {
  const imageId = req.params.id;
  try {
    console.log('----------------------------',imageId)
    await cloudinary.uploader.destroy(imageId);
    response.success(req, res, {mesage: "Cloudinary image deleted."})
  } catch (error) {
    response.error(req, res, error.message)
  }
})


module.exports = router;