import { AddSong,ListSong, RemoveSong } from "../controllers/songController.js";
import express  from "express";
import upload from "../middlewares/multer.js";

const songRouter = express.Router();

songRouter.post('/add',upload.fields([{name:'image',maxCount:1},{name:'audio',maxCount:1}]),AddSong);
songRouter.get('/list',ListSong);
songRouter.post('/remove',RemoveSong);

export default songRouter;