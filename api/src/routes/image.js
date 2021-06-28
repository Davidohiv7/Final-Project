const { Router } = require('express');
const router = Router();
const models = require('../database/models/');
const response = require('../utils/response');
const cloudinary = require("../utils/cloudinary");
const { Op } = require("sequelize");
const passport = require('passport');



router.delete("/cloudinary/:id", passport.authenticate('jwt', {session: false}), async (req, res) => {
  const imageId = req.params.id;
  try {
    await cloudinary.uploader.destroy(imageId);
    response.success(req, res, {mesage: "Cloudinary image deleted."})
  } catch (error) {
    response.error(req, res, error.message)
  }
})

router.post("/", passport.authenticate('jwt', {session: false}), async (req, res) => {
  const { images } = req.body
  
  try {
    for (let id of images) {
      const image = await models.Image.findOne({ where: {url: { [Op.like]: `%${id}%` }}});
      await image.destroy();
    }
    response.success(req, res, { message: "Image deleted successfully." });
  } catch (error) {
    response.error(req, res, error.message);
  }

})

module.exports = router;