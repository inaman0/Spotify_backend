import {v2 as cloudinary} from 'cloudinary'
import albumModel from '../models/albumModel.js'

const AddAlbum = async(req,res)=>{
    try{
        const name = req.body.name;
        const desc = req.body.desc;
        const bgcolor = req.body.bgcolor;
        const imageFile = req.file;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
        const albumData = {
            name,
            desc,
            bgcolor,
            image: imageUpload.secure_url
        }

        const album=albumModel(albumData);
        await album.save();
        res.json({success:true,message:"Album added"});
    }
    catch(error){
        res.json({success:false});
    }
}
const ListAlbum = async(req,res)=>{
    try{
        const allAlbum = await albumModel.find({});
        res.json({success:true,albums:allAlbum});
    }
    catch(error){
        res.json({success:false})
    }
}
const RemoveAlbum = async(req,res)=>{
    try{
        await albumModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Album removed"});
    }
    catch(error){
        res.json({success:false});
    }
}

export {AddAlbum,ListAlbum,RemoveAlbum}