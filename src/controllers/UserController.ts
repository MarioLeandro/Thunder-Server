import {Request, Response} from 'express'
import User from '../models/User'
import * as jwt from 'jsonwebtoken'

class UserController {
    async create(req: Request, res: Response) {
        const {
            name,
            email,
            password,
        } = req.body;


        try {
            const userExists = await User.findOne({email})
            
            if(userExists) {
                return res.status(400).json({
                    error: "E-mail ja cadastrado",
                    message: "E-mail ja cadastrado"
                })
            }

            const user = await User.create({
                name,
                email,
                password,
                level: 0,
                currentExperience: 0,
                picture: ''
            })

            return res.json(user);
        } catch (error) {
            return res.status(400).json({
                error: error,
                message: "Falha no registro do usuário"
            })
        }
    }
    
    /* async update(req: Request, res: Response) {
        const user = req.user;

        const {
            bought
        } = req.body;

        try {
            if(!user) {
                return res.status(403).json({error: "Usuário não encontrado",
                message: "Usuário não encontrado"})
            }

            const usertoUpdate = await User.findOne({email: user.email})

            
            const updatedUser = await User.updateOne(
                { email: user.email },
              ) 

            return res.json(updatedUser);
        } catch (error) {
            return res.status(500).json({
                error: error,
                message: "Falha ao listar perfil"
            })
        }
    } */

    async levelUp(req: Request, res: Response) {
        const user = req.user;

        const {
            finalExperience,
            finalLevel,
          } = req.body;

        try {
            if(!user) {
                return res.status(403).json({error: "Usuário não encontrado",
                message: "Usuário não encontrado"})
            }
            
            const updatedUser = await User.updateOne(
                { email: user.email },
                {currentExperience: finalExperience, level: finalLevel}
              ) 

            return res.json(updatedUser);
        } catch (error) {
            return res.status(500).json({
                error: error,
                message: "Falha ao listar perfil"
            })
        }
    } 

    async changePic(req: Request, res: Response) {

        const user = req.user;

        let image = null;
        if (req.file) {
        const { filename } = req.file;
        image = filename;
        }

        try {
            if(!user) {
                return res.status(403).json({error: "Usuário não encontrado",
                message: "Usuário não encontrado"})
            }

            await User.findOneAndUpdate({email: user.email}, {picture: image})

            return res.json({
                message: "Ok"
            });
        } catch (error) {
            return res.status(400).json({
                error: error,
                message: "Falha no registro da postagem"
            })
        }
    }

    async index(req: Request, res: Response) {
        try {

            const users = await User.find()

            return res.json(users);
        } catch (error) {
            return res.status(500).json({
                error: error,
                message: "Falha ao listar usuários"
            })
        }
    }

    async view(req: Request, res: Response) {
        const user = req.user;
        try {
            if(!user) {
                return res.status(403).json({error: "Usuário não encontrado",
                message: "Usuário não encontrado"})
            }

            const userInfos = await User.findOne({email: user.email})

            return res.json(userInfos);
        } catch (error) {
            return res.status(500).json({
                error: error,
                message: "Falha ao listar perfil"
            })
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;


        try {
            const user = await User.findOne({email}).select("+password");
            const match = await user?.comparePassword(password);
            if(match) {
                const token = jwt.sign({
                    user: {name: user?.name, email: user?.email, id: user?._id, level: user?.level, currentExperience: user?.currentExperience, picture: user?.picture}
                },
                process.env.SECRET,
                {
                    expiresIn: '2h'
                }
                )
                return res.json({user, token})
            } else {
                return res.status(500).json({
                    error: "Credenciais Invalidas",
                    message: "Credenciais Invalidas"
                })
            }
        } catch (error) {
            return res.status(500).json({
                error: error,
                message: "Falha ao logar"
            })
        }

    }
}

export default new UserController