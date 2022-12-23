const mongoose = require('mongoose');

const multer = require('multer');

const path = require('path');

const avatar_path = path.join('/Assets/img');

const adminschema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    avatar : {
        type : String,
        required : true
    }
});

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,path.join(__dirname,'..',avatar_path));
    },
    filename : (req,file,cb) => {
        cb(null,file.fieldname + '-' + Date.now());
    }
});

let avatar = multer({storage : storage}).single('avatar');

adminschema.statics.uploadimg = avatar;
adminschema.statics.avatar_path = avatar_path;

const admin = mongoose.model('admin',adminschema);

module.exports = admin;


