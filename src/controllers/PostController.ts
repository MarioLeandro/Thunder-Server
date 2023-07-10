import {Request, Response} from 'express'
import Post from '../models/Post';
import Comment from '../models/Comment';

class PostController {
    async create(req: Request, res: Response) {

        const {text} = req.body;
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

             const post = await Post.create({
                text,
                user: user.id,
                image: image,
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

    async createComment(req: Request, res: Response) {

        const {text} = req.body;
        const {post_id} = req.params;
        const user = req.user;

        try {
            if(!user) {
                return res.status(403).json({error: "Usuário não encontrado",
                message: "Usuário não encontrado"})
            }

            const comment = await Comment.create({
                text,
                user: user.id,
            })

            const post = await Post.findOne({_id: post_id})

            post.comments = [comment._id, ...post.comments]

            post.save();

            return res.json(post);
        } catch (error) {
            return res.status(400).json({
                error: error,
                message: "Falha no registro do comentário"
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

     async index(req: Request, res: Response) {
         try {

             const posts = await Post.find().populate('user').populate({
                path: 'comments',
                populate: {
                  path: 'user',
                  model: 'User'
                }
              }).exec();

             return res.json(posts.reverse());
         } catch (error) {
             return res.status(500).json({
                 error: error,
                 message: "Falha ao listar posts"
             })
         }
     }

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