var objAtualizaChamadoCitsmart = {
    atualizaChamado: async (req, res) => {

        var moment = require('moment');
        var datetime = moment().unix();

        // Pega dados do citsmart no banco de dados
        var dataConfigCitsmart = await DataConfigCitsmart.findOne({
            chatbot_name: (req.body.chatbot_name) ? req.body.chatbot_name : '',
        });
        // Criar chamado no citsmart
        // Passa os dados necessarios para abertura do chamado
        var citsmartAtualizaChamadoHelper = await sails.helpers.citsmartAtualizaChamadoHelper.with({
            username: dataConfigCitsmart.username,
            password: dataConfigCitsmart.password,
            url: dataConfigCitsmart.url,
            textUser: req.body.description,
            chamado: req.body.chamado,
        })
        .tolerate('E_INVALID_ARGINS', () => {
            return {error: 'Todos os parametros são obrigatórios!', status_code: 500, status_description: 'Erro interno do servidor'};
        });
        // Se ocorrer um error ao tentar abrir chamado
        if(citsmartAtualizaChamadoHelper !== undefined && citsmartAtualizaChamadoHelper.error){

            // Registra o log no banco de dados
            var registerLogHelper = await sails.helpers.registerLogHelper.with({
                error: citsmartCriaChamadoHelper.error,
                status_code: citsmartCriaChamadoHelper.status_code,
                status_description: citsmartCriaChamadoHelper.status_description,
                chatbot_name: chatbot_name.toUpperCase().trim(),
                date_error: datetime
            });
            // retorna o numero do chamado como 1, para a aplicação tentar abertura de chamado sempre que houver uma pergunta do usuário
            return res.json(1);
        }
        // Retorna o número do chamado atualizado no citsmart
        return res.json(req.body.chamado);
    },
};
module.exports = objAtualizaChamadoCitsmart;