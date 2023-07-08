import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
const PORT = process.env.PORT || 4040;
import videoRoute from './routes/videos';
import cors from 'cors';
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/videos", videoRoute);
app.listen(PORT, () => {
    console.log("Server has started on port " + PORT);
});
