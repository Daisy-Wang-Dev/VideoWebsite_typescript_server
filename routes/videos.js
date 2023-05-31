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


// Get single video
router.get("/:id", (req, res)=> {
    const specificVideo = videoData.find((video)=> {
      return  video.id === req.params.id
    });

    if(!specificVideo) {
        res.status(404).send("Video is not found");
    }

    res.json(specificVideo);
})



module.exports = router;