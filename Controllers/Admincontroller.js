const admin = require("../Models/adminschema");

const fs = require('fs');

const jwt = require('jsonwebtoken');
const path = require("path");

const secret = 'jenish';


module.exports.register = (req,res) => {
    admin.uploadimg(req,res,(err) => {
        if(err)
        {
            return res.json({'status' : '0','message' : 'FIle not Upload'});

        }

        let email = req.body.email;
        admin.findOne({email : email},(err,data) => {
            if(err)
            {
                return res.json({'status' : '0','message' : 'User Not Found'});
            }

            if(data)
            {
                return res.json({'status' : '0','message' : 'Email Already Exist'});
            }
            else
            {
                    let avatar = ''
            if(req.file)
            {
                avatar = admin.avatar_path + '/' + req.file.filename;
                if(req.body.password == req.body.cpassword)
                {
                    admin.create({
                        name : req.body.name,
                        email : req.body.email,
                        password : req.body.password,
                        avatar : avatar
                    },(err,data) => {
                        if(err)
                        {
                            return res.json({'status' : '0','message' : 'data not Insert'});
                        }
                        return res.json({'status' : '0','message' : 'data Insert','Admin' : data});
                    })

                }
                else
                {
                    return res.json({'status' : '0','message' : 'Both Password dose not Match'});
                }

            }
            else
            {
                console.log('error');
            }
            }

            

        });
            

    }) 
}

module.exports.view = (req,res) => {
    admin.find({},(err,data) => {
        if(err)
        {
            return res.json({'status' : '0','message' : 'data not Found'});
        }

        return res.json({'status' : '1','record' : data});

    })
}

module.exports.delete = (req,res) => {
    admin.findById(req.query.id,(err,data) => {
        if(err)
        {
            return res.json({'status' : '0','message' : 'ID not Found'});
        }

        if(data.avatar)
        {
            fs.unlinkSync(path.join(__dirname,'../',data.avatar));
        }

        admin.findByIdAndDelete(req.query.id,(err,data) => {
            if(err)
            {
                return res.json({'status' : '0','message' : 'data not Deleted'});
            }

            return res.json({'status' : '0','message' : 'data Deleted'});
        })

    });
    
}

module.exports.put = (req,res) => {
    console.log(req.query.id);

    admin.uploadimg(req,res,(err) => {
        if(err)
        {
            return res.json({'status' : '0','message' : 'FIle not Upload'});
        }

        admin.findById(req.query.id,(err,data) => {
            if(err)
            {
                return res.json({'status' : '0','message' : 'ID not Found'});
            }
    
            console.log(req.file);
            if(req.file)
            {
                if(data.avatar)
                {
                    fs.unlinkSync(path.join(__dirname,'../',data.avatar));
                }
    
                let avatar = admin.avatar_path + '/' + req.file.filename;
    
                if(req.body.password == req.body.cpassword)
                {
                    admin.findByIdAndUpdate(req.query.id,{
                        name : req.body.name,
                        email : req.body.email,
                        password : req.body.password,
                        avatar : avatar
                    },(err,data) => {
                        if(err)
                        {
                            return res.json({'status' : '0','message' : 'data not Update'});
                        }
                
                        return res.json({'status' : '0','message' : 'data Updated'});
                
                    })
                }
                else
                {
                    return res.json({'status' : '0','message' : 'Both Password dose not Match'});
                }
    
            }
            else
            {
                if(req.body.password == req.body.cpassword)
                {
                    console.log(req.body);
                    admin.findByIdAndUpdate(req.query.id,{
                        name : req.body.name,
                        email : req.body.email,
                        password : req.body.password,
                    },(err,data) => {
                        if(err)
                        {
                            return res.json({'status' : '0','message' : 'data not Update'});
                        }
                
                        return res.json({'status' : '0','message' : 'data Updated'});
                
                    })
                }
                else
                {
                    return res.json({'status' : '0','message' : 'Both Password dose not Match'});
                }
            }
    
        });

    })


    
}

module.exports.login  = (req,res) => {
    admin.findOne({email : req.body.email},(err,data) => {
        if(err)
        {
            return res.json({'status' : '0','message' : 'data not Found'});
        }

        if(data)
        {
            if(data.password == req.body.password)
            {
                const token = jwt.sign(data.toJSON(),secret,{expiresIn : 1000*60});
                res.cookie('token',token);
                return res.json({'message' : 'token generated','Token' : token});
            }
        }
        else
        {
            return res.json({'status' : '0','message' : 'Email not Found'});
        }

    })
}

module.exports.logout = (req,res) => {
    req.logout((err) => {
        if(err)
        {
            return res.json({'status' : '0','message' : 'You are not Logout'});
        }
    });
    res.clearCookie ("token");
    res.json({'status' : '1','message' : 'Logout Successfully'});

}