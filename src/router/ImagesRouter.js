const express = require("express");
const multer = require("multer");
const Image = require("../models/Image");
const { upload, get, deleteImage } = require("../storage/storageUtils");
const router = express.Router();

router.get("/", async (req, res) => {
  const imageId = req.query.imageId;
  if (imageId == null) return res.send(await Image.findAll());
  return res.send(await Image.findAll({ where: { id: imageId } }));
});

router.post("", multer().any(), async (req, res) => {
  const name = req.query.name;
  return upload(req.files[0], async (err, image) => {
    if (err) console.error(err);
    const imageDB = await Image.create({
      id: image.Key,
      name,
      imageUrl: image.Location,
    });
    return res.send(imageDB);
  });
});

router.delete("", async (req, res) => {
  const imageId = req.query.imageId;
  try {
    const imageDB = await Image.destroy({
      where: {
        id: imageId,
      },
    });

    return deleteImage(imageId, (err, data) => {
      if (err) return res.status(500).send(err);
      else return res.send(data);
    });
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = router;
