import userModel from '../Models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4} from 'uuid';

export const Get = async (req, res) => {
    try {
        const user = await userModel.findAll({
            attributes: ['id','name','email']
        });
        res.json({
            data: user
        });
    } catch (error) {
        console.error(error);   
    }
}

export const Register = async(req, res) => {
    const { name, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({
        message: "Password dan Confim Password Tidak Cocok."
    });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await userModel.create({
            id: uuidv4(),
            name: name,
            email: email,
            password: hashPassword
        });
            res.status(201).json({
                message: "Register berhasil"
            });
    } catch (error) {
        console.error(error);
    }
}

export const Login = async(req, res) => {
    try {
        const user = await userModel.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) {
            return res.status(400).json(({
                message: 'Wrong Password'
            }));
        } else if(match) {
            const userid    = user[0].id;
            const name      = user[0].name;
            const email     = user[0].email;
            const accessToken   = jwt.sign({
                userid,
                name,
                email
            }, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '20s'
            });
                const refreshToken = jwt.sign({
                    userid,
                    name,
                    email
                }, process.env.REFRESH_TOKEN_SECRET,{
                    expiresIn: '1d'
                });
                    await userModel.update({refresh_token: refreshToken},{
                        where: {
                            id: userid
                        }
                    });
                        res.cookie('refreshToken', refreshToken, {
                            httponly: true,
                            maxAge: 24 * 60 * 60 * 1000
                        });
                            res.json({
                                accessToken
                            });
        }
    } catch (error) {
        res.status()
    }   
}

export const Logout = async(req, res) => {
    const refresh_token = req.cookies.refreshToken;
    if(!refresh_token) return res.sendStatus(403);
    const user = await userModel.findAll({
        where: {
            refresh_token: refresh_token
        }
    });
        if(!user[0]) return res.sendStatus(403);
        const userid = user[0].id;
        await userModel.update({
            refresh_token: null
        },{
            where : {
                id: userid
            }
        });
            res.clearCookie('refreshToken');
            return res.sendStatus(200);
}