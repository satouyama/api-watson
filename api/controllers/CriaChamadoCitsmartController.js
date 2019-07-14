var objCriaChamadoCitsmart = {
    criaChamado: async (req, res) => {

        var moment = require('moment');
        var datetime = moment().unix();

        // Pega o nome do chatbot
        let chatbot_name    = (req.body.chatbot_name) ? req.body.chatbot_name : '';
        // Pega dados do citsmart no banco de dados
        let dataConfigCitsmart = await DataConfigCitsmart.findOne({ chatbot_name: chatbot_name.toUpperCase().trim() });
        // Se não existir os dados, registra o log
        if(!dataConfigCitsmart){
            
            // Registra o log no banco de dados
            var registerLogHelper = await sails.helpers.registerLogHelper.with({
                error: 'Dados do citsmart não foi encontrado, verifique a tabela de configurações no banco de dados!',
                status_code: 204,
                status_description: 'Nenhum conteúdo',
                chatbot_name: chatbot_name.toUpperCase().trim(),
                date_error: datetime
            });
            // retorna o numero do chamado como 1, para a aplicação tentar abertura de chamado sempre que houver uma pergunta do usuário
            return res.json(1);
        }
        // Pega intenção do usuário
        let intent   = (req.body.intent) ? req.body.intent : '';
        // Pesquisa intenção para pegar o código de serviço do citsmart
        let intencao = await Intencao.findOne({ intent: intent.trim(), chatbot_name: chatbot_name.toUpperCase().trim() });
        // Se não existir os dados, registra o log
        if(!intencao){

            // Registra o log no banco de dados
            var registerLogHelper = await sails.helpers.registerLogHelper.with({
                error: 'Intenção não foi encontrado, verifique a tabela de intenção no banco de dados!',
                status_code: 204,
                status_description: 'Nenhum conteúdo',
                chatbot_name: chatbot_name.toUpperCase().trim(),
                date_error: datetime
            });
            // retorna o numero do chamado como 1, para a aplicação tentar abertura de chamado sempre que houver uma pergunta do usuário
            return res.json(1);
        }
        // Criar chamado no citsmart
        // Passa os dados necessarios para abertura do chamado
        var citsmartCriaChamadoHelper = await sails.helpers.citsmartCriaChamadoHelper.with({
            username: dataConfigCitsmart.username,
            password: dataConfigCitsmart.password,
            url: dataConfigCitsmart.url,
            serviceCode: intencao.serviceCode,
            contractID: intencao.contractID,
            byid: dataConfigCitsmart.byid,
            textUser: req.body.description,
        })
        .tolerate('E_INVALID_ARGINS', () => {
            return {error: 'Todos os parametros são obrigatórios!', status_code: 500, status_description: 'Erro interno do servidor'};
        });

        // Se ocorrer um error ao tentar abrir chamado
        if(citsmartCriaChamadoHelper !== undefined && citsmartCriaChamadoHelper.error){

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
        // Retorna o número do chamado aberto no citsmart
        return res.json(citsmartCriaChamadoHelper.chamado);
    },
};
module.exports = objCriaChamadoCitsmart;