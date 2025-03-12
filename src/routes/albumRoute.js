import express  from "express";
import { AddAlbum,ListAlbum,RemoveAlbum } from "../controllers/albumController.js";
import upload from "../middlewares/multer.js";

const albumRouter=express.Router();

albumRouter.post('/add',upload.single('image'),AddAlbum);
albumRouter.get('/list',ListAlbum);
albumRouter.post('/remove',RemoveAlbum);

export default albumRouter;