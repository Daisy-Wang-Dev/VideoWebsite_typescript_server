"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crypto_1 = __importDefault(require("crypto"));
const router = (0, express_1.Router)();
const videoData = require("../data/videos.json");
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = videoData.map((video) => {
            const { id, channel, title, image } = video;
            return { id: id, channel: channel, title: title, image: image };
        });
        res.status(200).json(videos);
    }
    catch (err) {
        res.status(500).json({
            error: true,
            message: `Error getting the videos`,
            details: `${err.message}`,
        });
    }
}));
// Get single video
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specificVideo = videoData.find((video) => {
            return video.id === req.params.id;
        });
        if (!specificVideo) {
            res.status(404).send("Video is not found");
        }
        res.status(200).json(specificVideo);
    }
    catch (err) {
        res.status(500).json({
            error: true,
            message: `Error getting the video with ID ${req.params.id}`,
            details: `${err.message}`,
        });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).send("Please fill in all fields");
        }
        const newVideo = {
            id: crypto_1.default.randomUUID(),
            title: title,
            description: description,
            channel: "Daisy Wang",
            image: "http://localhost:3030/Upload-video-preview.jpg",
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
    }
    catch (err) {
        res.status(500).json({
            error: true,
            message: `Error posting the videos`,
            details: `${err.message}`,
        });
    }
}));
exports.default = router;
