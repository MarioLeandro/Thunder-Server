import {Request, Response} from 'express'
import Post from '../models/Post';

class PostController {
    async create(req: Request, res: Response) {

        const {text, image} = req.body;
        const user = req.user;

        //const { filename } = req.file       
        console.log(req.file)

        try {
            if(!user) {
                return res.status(403).json({error: "Usuário não encontrado",
                message: "Usuário não encontrado"})
            }

             const post = await Post.create({
                text,
                user: user.id,
                comments: []
            })

            return res.json(post);
        } catch (error) {
            return res.status(400).json({
                error: error,
                message: "Falha no registro da postagem"
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

    // async index(req: Request, res: Response) {
    //     try {

    //         const users = await User.find()

    //         return res.json(users);
    //     } catch (error) {
    //         return res.status(500).json({
    //             error: error,
    //             message: "Falha ao listar usuários"
    //         })
    //     }
    // }

    // async view(req: Request, res: Response) {
    //     const user = req.user;
    //     try {
    //         if(!user) {
    //             return res.status(403).json({error: "Usuário não encontrado",
    //             message: "Usuário não encontrado"})
    //         }

    //         const userInfos = await User.findOne({email: user.email})

    //         return res.json(userInfos);
    //     } catch (error) {
    //         return res.status(500).json({
    //             error: error,
    //             message: "Falha ao listar perfil"
    //         })
    //     }
    // }

    // async login(req: Request, res: Response) {
    //     const { email, password } = req.body;


    //     try {
    //         const user = await User.findOne({email}).select("+password");
    //         const match = await user?.comparePassword(password);
    //         if(match) {
    //             const token = jwt.sign({
    //                 user: {name: user?.name, email: user?.email}
    //             },
    //             process.env.SECRET,
    //             {
    //                 expiresIn: '2h'
    //             }
    //             )
    //             return res.json({user, token})
    //         } else {
    //             return res.status(500).json({
    //                 error: "Credenciais Invalidas",
    //                 message: "Credenciais Invalidas"
    //             })
    //         }
    //     } catch (error) {
    //         return res.status(500).json({
    //             error: error,
    //             message: "Falha ao logar"
    //         })
    //     }

    // }
}

export default new PostController