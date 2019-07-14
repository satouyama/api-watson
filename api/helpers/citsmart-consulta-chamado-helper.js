module.exports = {


  friendlyName: 'Citsmart consulta chamado helper',


  description: '',


  inputs: {
    numeroChamado: {
      type: 'number',
      example: 1234,
      description: 'Número do chamado',
      required: true
    }
  },


  exits: {
    success: {
    },
    noServiceUnauthorized: {
      description: 'Prezado usuario, verifique se você possui permissão para realizar consultas. Entre em contato com a Central de Atendimento.'
    },
    noNumberCallFound: {
      description: 'Prezado usuario, o chamado informado não existe. Favor, entrar em contato com a Central de atendimento para verificar a ocorrência.'
    },
    errService: {
      description: 'Erro no serviço, contate o administrador do sistema!'
    }
  },


  fn: async function (inputs, exits) {
    var requestJson = require('request-json');

    requestJson
      .createClient(sails.config.CITSMART_URL)
      .post('services/login',
        {
          userName: sails.config.CITSMART_USERNAME,
          password: sails.config.CITSMART_PASSWORD
        },
        function (err, response, body) {

          if (err) {
            sails.log(err);
            return exits.errService();
          }

          let sessionID = body.sessionID; // Pega o session ID

          requestJson
            .createClient(sails.config.CITSMART_URL)
            .post('services/request/getById',
              { sessionID: sessionID, number: inputs.numeroChamado },
              (err, response, callback) => {

                if (err) {
                  sails.log(err);
                  return exits.errService();
                }

                if (Buffer.isBuffer(callback)) {

                  return exits.noServiceUnauthorized();
                } else if (!callback.request) {

                  return exits.noNumberCallFound();
                } else {

                  var date = new Date(callback.request.endSLA);
                  var dataFormatada = ("0" + date.getDate()).substr(-2) + "/" + ("0" + (date.getMonth() + 1)).substr(-2) + "/" + date.getFullYear();
                  var n = date.getUTCHours();

                  return exits.success({ description: "Obrigada por aguardar, o chamado encontra-se: " + callback.request.status.name + ", aos cuidados do grupo " + callback.request.groupId + ". O prazo de atendimento é até o dia " + dataFormatada + " ás " + n + " horas." });
                }
              });
        }
      );
  }

};

