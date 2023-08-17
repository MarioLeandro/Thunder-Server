import {Request, Response} from 'express'
import openai from '../config/openai';

class TrainingController {
    async generate(req: Request, res: Response) {

        const {focus, level, height, weight} = req.body;


        try {

           const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "system", content: "Você é um personal trainer responsável por especificar treinos de acordo com as [Necessidades] do aluno. O resultado deve ser retornado em JSON com os campos: plano_de_treino e lista com 4 passos."},
                {role: "user", content: "[Necessidades]: foco do treino: perna; nível: iniciante; altura: 1.75m; peso: 65kg"},
                {role: "assistant", content: "{\"plano_de_treino\":\"Treino de Perna para Iniciantes\",\"passos\":[{\"passo\":1,\"exercicio\":\"Agachamento\",\"descricao\":\"3 séries de 12 repetições de agachamento.\"},{\"passo\":2,\"exercicio\":\"Afundo\",\"descricao\":\"3 séries de 10 repetições de afundo em cada perna.\"},{\"passo\":3,\"exercicio\":\"Cadeira Extensora\",\"descricao\":\"3 séries de 15 repetições na cadeira extensora.\"},{\"passo\":4,\"exercicio\":\"Panturrilha em Pé\",\"descricao\":\"3 séries de 15 repetições de panturrilha em pé.\"}]}"},
                {role: "user", content: `[Necessidades]: foco do treino: ${focus}; nível: ${level}; altura: ${height}, peso:${weight}`}
                ],
          });

            return res.json(JSON.parse(response.data.choices[0].message.content));
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                error: error,
                message: "Falha na consulta a AI"
            })
        }
    }


}

export default new TrainingController