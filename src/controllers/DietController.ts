import {Request, Response} from 'express'
import openai from '../config/openai';

class DietController {
    async generate(req: Request, res: Response) {

        const {isVegan, height, weight} = req.body;


        try {

           const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "system", content: "Você é um nutricionista responsável por especificar dietas de acordo com as [Necessidades] do paciente. O resultado deve ser retornado em JSON com os campos: cafe_da_manha, almoco, jantar, onde cada um terá alimentos, que possuiram os campos, alimento, quantidade e horário"},
                {role: "user", content: "[Necessidades]: altura: 1.75m; peso: 65kg; vegano: não"},
                {role: "assistant", content: "{\"cafe_da_manha\":[{\"alimento\":\"Omelete de claras com espinafre e tomate 🍳\",\"quantidade\":\"3 claras de ovo\",\"horario\":\"08:00\"},{\"alimento\":\"Aveia com frutas 🥣\",\"quantidade\":\"1/2 xícara de aveia\",\"horario\":\"08:00\"},{\"alimento\":\"Suco de laranja natural 🍊\",\"quantidade\":\"1 copo\",\"horario\":\"08:00\"},{\"alimento\":\"Iogurte grego com amêndoas e mel 🍯\",\"quantidade\":\"200g de iogurte grego\",\"horario\":\"08:00\"}],\"almoco\":[{\"alimento\":\"Peito de frango grelhado 🍗\",\"quantidade\":\"150g\",\"horario\":\"12:30\"},{\"alimento\":\"Arroz integral 🍚\",\"quantidade\":\"1 xícara\",\"horario\":\"12:30\"},{\"alimento\":\"Brócolis cozido 🥦\",\"quantidade\":\"1 xícara\",\"horario\":\"12:30\"},{\"alimento\":\"Batata doce assada 🍠\",\"quantidade\":\"1 média\",\"horario\":\"12:30\"},{\"alimento\":\"Queijo cottage com cenoura 🧀\",\"quantidade\":\"100g de queijo cottage\",\"horario\":\"12:30\"}],\"jantar\":[{\"alimento\":\"Salmão grelhado 🐟\",\"quantidade\":\"150g\",\"horario\":\"19:00\"},{\"alimento\":\"Quinoa cozida 🍲\",\"quantidade\":\"1 xícara\",\"horario\":\"19:00\"},{\"alimento\":\"Salada de folhas verdes 🥗\",\"quantidade\":\"1 prato\",\"horario\":\"19:00\"},{\"alimento\":\"Chá de camomila ☕\",\"quantidade\":\"1 xícara\",\"horario\":\"19:00\"},{\"alimento\":\"Castanhas 🌰\",\"quantidade\":\"30g\",\"horario\":\"19:00\"}]}"},
                {role: "user", content: `[Necessidades]: altura: ${height}, peso:${weight} vegano:${isVegan ? 'sim' : 'não'}`}
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

    async changeFood(req: Request, res: Response) {

        const {currentDiet, group, food, isVegan} = req.body;

        try {

           const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "system", content: "Você é um nutricionista responsável por especificar dietas de acordo com as [Necessidades] do paciente. O resultado deve ser retornado em JSON com os campos: cafe_da_manha, almoco, jantar, onde cada um terá alimentos, que possuiram os campos, alimento, quantidade e horário"},
                {role: "user", content: "[Necessidades]: altura: 1.75m; peso: 65kg; vegano: não"},
                {role: "assistant", content: "{\"cafe_da_manha\":[{\"alimento\":\"Omelete de claras com espinafre e tomate 🍳\",\"quantidade\":\"3 claras de ovo\",\"horario\":\"08:00\"},{\"alimento\":\"Aveia com frutas 🥣\",\"quantidade\":\"1/2 xícara de aveia\",\"horario\":\"08:00\"},{\"alimento\":\"Suco de laranja natural 🍊\",\"quantidade\":\"1 copo\",\"horario\":\"08:00\"},{\"alimento\":\"Iogurte grego com amêndoas e mel 🍯\",\"quantidade\":\"200g de iogurte grego\",\"horario\":\"08:00\"}],\"almoco\":[{\"alimento\":\"Peito de frango grelhado 🍗\",\"quantidade\":\"150g\",\"horario\":\"12:30\"},{\"alimento\":\"Arroz integral 🍚\",\"quantidade\":\"1 xícara\",\"horario\":\"12:30\"},{\"alimento\":\"Brócolis cozido 🥦\",\"quantidade\":\"1 xícara\",\"horario\":\"12:30\"},{\"alimento\":\"Batata doce assada 🍠\",\"quantidade\":\"1 média\",\"horario\":\"12:30\"},{\"alimento\":\"Queijo cottage com cenoura 🧀\",\"quantidade\":\"100g de queijo cottage\",\"horario\":\"12:30\"}],\"jantar\":[{\"alimento\":\"Salmão grelhado 🐟\",\"quantidade\":\"150g\",\"horario\":\"19:00\"},{\"alimento\":\"Quinoa cozida 🍲\",\"quantidade\":\"1 xícara\",\"horario\":\"19:00\"},{\"alimento\":\"Salada de folhas verdes 🥗\",\"quantidade\":\"1 prato\",\"horario\":\"19:00\"},{\"alimento\":\"Chá de camomila ☕\",\"quantidade\":\"1 xícara\",\"horario\":\"19:00\"},{\"alimento\":\"Castanhas 🌰\",\"quantidade\":\"30g\",\"horario\":\"19:00\"}]}"},
                {role: "user", content: `Foi gerada a seguinte dieta:\n {\"cafe_da_manha\":[{\"alimento\":\"Omelete de claras com espinafre e tomate 🍳\",\"quantidade\":\"3 claras de ovo\",\"horario\":\"08:00\"},{\"alimento\":\"Aveia com frutas 🥣\",\"quantidade\":\"1/2 xícara de aveia\",\"horario\":\"08:00\"},{\"alimento\":\"Suco de laranja natural 🍊\",\"quantidade\":\"1 copo\",\"horario\":\"08:00\"},{\"alimento\":\"Iogurte grego com amêndoas e mel 🍯\",\"quantidade\":\"200g de iogurte grego\",\"horario\":\"08:00\"}],\"almoco\":[{\"alimento\":\"Peito de frango grelhado 🍗\",\"quantidade\":\"150g\",\"horario\":\"12:30\"},{\"alimento\":\"Arroz integral 🍚\",\"quantidade\":\"1 xícara\",\"horario\":\"12:30\"},{\"alimento\":\"Brócolis cozido 🥦\",\"quantidade\":\"1 xícara\",\"horario\":\"12:30\"},{\"alimento\":\"Batata doce assada 🍠\",\"quantidade\":\"1 média\",\"horario\":\"12:30\"},{\"alimento\":\"Queijo cottage com cenoura 🧀\",\"quantidade\":\"100g de queijo cottage\",\"horario\":\"12:30\"}],\"jantar\":[{\"alimento\":\"Salmão grelhado 🐟\",\"quantidade\":\"150g\",\"horario\":\"19:00\"},{\"alimento\":\"Quinoa cozida 🍲\",\"quantidade\":\"1 xícara\",\"horario\":\"19:00\"},{\"alimento\":\"Salada de folhas verdes 🥗\",\"quantidade\":\"1 prato\",\"horario\":\"19:00\"},{\"alimento\":\"Chá de camomila ☕\",\"quantidade\":\"1 xícara\",\"horario\":\"19:00\"},{\"alimento\":\"Castanhas 🌰\",\"quantidade\":\"30g\",\"horario\":\"19:00\"}]} \n troque apenas o elemento que possui o alimento: Omelete de claras com espinafre e tomate 🍳, no cafe_da_manha, de forma que apenas ele seja substituido enquanto o restante da dieta se mantem da forma que está, lembrando que o paciente não é vegano`},
                {role: "assistant", content: "{\"cafe_da_manha\":[{\"alimento\":\"Pão integral com pasta de amendoim 🍞\",\"quantidade\":\"1 copo\",\"horario\":\"08:00\"},{\"alimento\":\"Aveia com frutas 🥣\",\"quantidade\":\"1/2 xícara de aveia\",\"horario\":\"08:00\"},{\"alimento\":\"Suco de laranja natural 🍊\",\"quantidade\":\"1 copo\",\"horario\":\"08:00\"},{\"alimento\":\"Iogurte grego com amêndoas e mel 🍯\",\"quantidade\":\"200g de iogurte grego\",\"horario\":\"08:00\"}],\"almoco\":[{\"alimento\":\"Peito de frango grelhado 🍗\",\"quantidade\":\"150g\",\"horario\":\"12:30\"},{\"alimento\":\"Arroz integral 🍚\",\"quantidade\":\"1 xícara\",\"horario\":\"12:30\"},{\"alimento\":\"Brócolis cozido 🥦\",\"quantidade\":\"1 xícara\",\"horario\":\"12:30\"},{\"alimento\":\"Batata doce assada 🍠\",\"quantidade\":\"1 média\",\"horario\":\"12:30\"},{\"alimento\":\"Queijo cottage com cenoura 🧀\",\"quantidade\":\"100g de queijo cottage\",\"horario\":\"12:30\"}],\"jantar\":[{\"alimento\":\"Salmão grelhado 🐟\",\"quantidade\":\"150g\",\"horario\":\"19:00\"},{\"alimento\":\"Quinoa cozida 🍲\",\"quantidade\":\"1 xícara\",\"horario\":\"19:00\"},{\"alimento\":\"Salada de folhas verdes 🥗\",\"quantidade\":\"1 prato\",\"horario\":\"19:00\"},{\"alimento\":\"Chá de camomila ☕\",\"quantidade\":\"1 xícara\",\"horario\":\"19:00\"},{\"alimento\":\"Castanhas 🌰\",\"quantidade\":\"30g\",\"horario\":\"19:00\"}]}"},
                {role: "user", content: `Foi gerada a seguinte dieta:\n ${currentDiet}\n troque apenas o elemento que possui o alimento: ${food}, no ${group} de forma que apenas ele seja substituido enquanto o restante da dieta se mantem da forma que está, lembrando que o paciente ${isVegan ? 'é' : 'não é'} vegano`}
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

export default new DietController