const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const  { User }  = require('../model/usermodel')
const mongoose = require('mongoose')
const pwd = process.env.SECRETCODE

module.exports = {

    register:function (req,res) {
        console.log(req.body);
        
        let{username,email,password} = req.body
        let token = jwt.sign({username},'SECRET');

        let userregister = new User ({
            username,
            email,
            password
        })

    userregister
        .save((err, result) => {
            const msg = 'email atau password salah'

            if (!err) {
                res.status(201).json({
                    message: 'registered succes',
                    data: result
                })
            } else {
                res.status(500).json({
                message: msg
                })
            }
        })
    },
   
    login:function (req,res) {
        console.log(req.body);
        
        // res.send(req)
        //let{username} = req.body
        User.findOne({
            username: req.body.username,
        }
        ,function(err, user){
            if (err) {
                throw err
            }else{
                //res.send(user.password)

                user.comparePassword(req.body.password, function(err,isMatch){
                    if(err){
                        throw err;
                        
                    }
                    // console.log('Password123:', isMatch);
                    if(isMatch){    
                        let token = jwt.sign({id:user._id,username:user.username},"SECRET");
                        res.status(200).json({token})
                    }
                    else{
                        res.status(500).json('WRONG PASSWORD')
                    }
                    
                })
            }                        
        })
    }    
}