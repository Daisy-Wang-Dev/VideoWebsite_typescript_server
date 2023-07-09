import { Router, Request, Response } from "express";
import crypto from "crypto";

const router: Router = Router();
import videoData from "../data/videos.json";

// Get all videos
interface Video {
  id: string;
  channel: string;
  title: string;
  image: string;
}
router.get("/", async (req: Request, res: Response) => {
  try {
    const videos: Video[] = videoData.map((video: Video) => {
      const { id, channel, title, image } = video;
      return { id: id, channel: channel, title: title, image: image };
    });
    res.status(200).json(videos);
  } catch (err: any) {
    res.status(500).json({
      error: true,
      message: `Error getting the videos`,
      details: `${err.message}`,
    });
  }
});

// Get single video
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const specificVideo = videoData.find((video: Video) => {
      return video.id === req.params.id;
    });

    if (!specificVideo) {
      res.status(404).send("Video is not found");
    }

    res.status(200).json(specificVideo);
  } catch (err: any) {
    res.status(500).json({
      error: true,
      message: `Error getting the video with ID ${req.params.id}`,
      details: `${err.message}`,
    });
  }
});

// Post a new video
interface Body {
  title: string;
  description: string;
}

interface newVideo {
  id: `${string}-${string}-${string}-${string}-${string}`;
  title: string;
  description: string;
  channel: string;
  image: string;
  views: string;
  likes: string;
  timestamp: number;
  duration: string;
  video: string;
  comments: {
    id: string;
    name: string;
    comment: string;
    likes: number;
    timestamp: number;
  }[];
}

router.post("/", async (req: Request, res: Response) => {
  try {
    const { title, description }: Body = req.body;

    if (!title || !description) {
      return res.status(400).send("Please fill in all fields");
    }

    const newVideo: newVideo = {
      id: `${crypto.randomUUID()}`,
      title: title,
      description: description,
      channel: "Daisy Wang",
      image: "http://localhost:3030/Upload-video-preview.jpg",
      views: "2,001,023",
      likes: "210,985",
      timestamp: new Date().getTime(),
      duration: "4:01",
      video: "https://project-2-api.herokuapp.com/stream",
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
  } catch (err: any) {
    res.status(500).json({
      error: true,
      message: `Error posting the videos`,
      details: `${err.message}`,
    });
  }
});

export default router;
