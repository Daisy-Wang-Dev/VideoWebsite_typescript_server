const express = require("express");
const router = express.Router();
const videoData = require("../data/videos.json");
const crypto = require("crypto");


// Get all videos

router.get("/", (req, res) => {
  const videos = videoData.map((video) => {
    const { id, channel, title, image } = video;
    return { id: id, channel: channel, title: title, image: image };
  });
  res.json(videos);
});

module.exports = router;