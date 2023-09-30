import userModel from '../Models/UserModel.js';
import jwt from 'jsonwebtoken';

export const refreshToken = async(req, res) => {
    try {
        const refresh_Token = req.cookies.refreshToken;
        if(!refresh_Token) return res.sendStatus(401);
        const user = await userModel.findAll({
            where: {
                refresh_token: refresh_Token
            }
        });
            if(!user[0]) return res.sendStatus(403);
                jwt.verify(refresh_Token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                    if(err) return res.sendStatus(403);
                    const userid    = user[0].id;
                    const name      = user[0].name;
                    const email     = user[0].email;

                    const accessToken = jwt.sign({
                        userid,
                        name,
                        email
                    }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '120s'
                    });
                        res.json({
                            accessToken
                        });
                });
    } catch (error) {
        console.info(error);
    }
}