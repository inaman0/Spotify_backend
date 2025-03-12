import {v2 as cloudinary} from 'cloudinary'
import songModel from '../models/songModel.js';

const AddSong = async (req,res)=>{
    try{
        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files.audio[0];
        const image = req.files.image[0];
        const audioupload = await cloudinary.uploader.upload(audioFile.path,{resource_type:"video"});
        const imageupload = await cloudinary.uploader.upload(image.path,{resource_type:"image"});
        const duration = `${Math.floor(audioupload.duration/60)}:${Math.floor(audioupload.duration%60)}`
        //console.log(name,desc,album,audioupload,imageupload);
        const songData={
            name,
            desc,
            album,
            image:imageupload.secure_url,
            file:audioupload.secure_url,
            duration
        }

        const song=songModel(songData);
        await song.save();

        res.json({success:true,message:"Song added"});
    }
    catch(error){
        res.json({success:false});
    }
}

const ListSong = async (req,res)=>{
    try{
        const allSongs = await songModel.find({});
        res.json({success:true,songs:allSongs});
    }
    catch(error){
        res.json({success:false});
    }
}

const RemoveSong = async(req,res)=>{
    try{
        await songModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Song removed"});
    }
    catch(error){
        res.json({success:false});
    }
}

export {AddSong,ListSong,RemoveSong}