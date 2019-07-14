/**
 * AssistantController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var objAssistant = {

  // Início, action chamada na rota
  watsonAssistant: (req, res) => {
    let workspace_id = objAssistant.router(req);

    req.body.payload = {
      alternate_intents: true,
      workspace_id: workspace_id,
      input: req.body.input ? req.body.input : null,
      context: req.body.context ? req.body.context : null,
    }
    objAssistant.messageApiWatsonAssistant(req, res);
  },
  messageApiWatsonAssistant: (req, res) => {
    // Timezone
    req.body.context.timezone = 'America/Sao_Paulo';
    // Verifica se é a primeira mensgem ou uma mensagem de conversa já em andamento
    if (Object.keys(req.body.context).length > 0 && req.body.chamado > 0) {
      // Conversa em andamento e já possui chamado 
      objAssistant.apiCall(req, res);
    } else {
      // Inicio de conversa, a mensagem inicial fica definida no front-end
      objAssistant
        .connectApiWatsonAssistant()
        .then(function (connection) {
          //Inicia a conversa e pega um conversation ID do watson assistant
          connection.assistant.message(req.body.payload, function (err, result, response) {
            if (err) {
              sails.log.error('Erro: ', err);
              return res.status(500).json({
                error: 'Ops, ocorreu um problema!'
              });
            } else {
              
              req.body.payload.context = result.context;
              objAssistant.apiCall(req, res);
            }
          });
        }).catch(function (err) {
          sails.log(err);
        });
    }
  },
  apiCall: (req, res) => {
    // Conexão com API
    objAssistant
      .connectApiWatsonAssistant()
      .then(function (connection) {
        connection.assistant.message(req.body.payload, function (err, result, response) {
          if (err) {
            sails.log.error('Erro: ', err);
            return res.status(500).json({
              error: 'Ops, ocorreu um problema!'
            });
          } else {
            result.ip = req.body.ip;
            result.chamado = req.body.chamado;

            return res.status(200).json({
              text: result.output.text,
              intents: result.intents,
              context: result.context,
              chamado: result.chamado
            });
          }
        });
      }).catch(function (err) {
        sails.log(err);
      });
  },
  /*alertError: (req, res, msgLog) => {
    sails.log(msgLog);
    let msgErr = `Infelizmente o sistema comportou-se de maneira inesperada.<br/>
    A equipe de desenvolvimento foi notificada automaticamente.<br/>
    Esperamos solucionar o problema o mais rápido possível.<br/>
    Tente realizar a mesma operação mais tarde para verificar se o problema foi corrigido.<br/>
    Pedimos desculpas pelos transtornos causados e contamos com sua compreensão.`;
    return res.status(200).json({text: [msgErr], intents: ['problemSystem'], context: {}, chamado: 0});
  },*/

  router: (req) => {
    if (req.body.context.router) {
      return req.body.context.router;
    }
    if (req.body.workspace_id) {
      return req.body.workspace_id;
    } else {
      return null;
    }
  },

  //   #####################
  //   # INTANCIAS HELPERS #
  //   #####################

  connectApiWatsonAssistant: async () => {
    var ibmWatsonAssistantConnect = await sails.helpers.ibmWatsonAssistantConnectHelper();
    return ibmWatsonAssistantConnect;
  },
};


module.exports = objAssistant;
