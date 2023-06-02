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
router.get("/:id", (req, res) => {
  const specificVideo = videoData.find((video) => {
    return video.id === req.params.id;
  });

  if (!specificVideo) {
    res.status(404).send("Video is not found");
  }

  res.json(specificVideo);
});

// Post a new video
router.post("/", (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).send("Please fill in all fields");
  }

  const newVideo = {
    id: crypto.randomUUID(),
    title: title,
    description: description,
    channel: "Daisy Wang",
    image: "http://localhost:8080/Upload-video-preview.jpg",
    views: "2,001,023",
    likes: "210,985",
    timestamp: new Date(),
    comments: [
      {
        id: "35bba08b-1b51-4153-ba7e-6da76b5ec1b9",
        name: "Micheal Lyons",
        comment: "That's so coo!",
        likes: 3,
        timestamp: 1628522461000,
      },
      {
        id: "091de676-61af-4ee6-90de-3a7a53af7521",
        name: "Gary Wong",
        comment: "How can someone be so good!!!",
        likes: 0,
        timestamp: 1626011132000,
      },
    ],
  };
  videoData.push(newVideo);

  res.status(201).json(newVideo);
});

module.exports = router;
