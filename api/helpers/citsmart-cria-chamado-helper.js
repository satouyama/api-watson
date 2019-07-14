module.exports = {


  friendlyName: 'Citsmart cria chamado helper',

  description: '',

  inputs: {
    username: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    url: {
      type: 'string',
      required: true
    },
    serviceCode: {
      type: 'number',
      required: true
    },
    contractID: {
      type: 'number',
      required: true
    },
    byid: {
      type: 'string',
      required: true
    },
    textUser: {
      type: 'string',
      required: true
    },
  },

  exits: {
    success: {},
  },

  fn: async function (inputs, exits) {
    var requestJson = require('request-json');
    var url = inputs.url;
    var login = {
      userName: inputs.username,
      password: inputs.password
    };

    sails.log('Tentando logar...');
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    requestJson
      .createClient(url)
      .post('services/login', login, function (errLogin, resultLogin, responseLogin) {

        if(resultLogin !== undefined && resultLogin.statusCode === 404){

          sails.log("URL de login não foi encontrada!");
          return exits.success({error: "URL de login não foi encontrada!",status_code: 404,status_description: 'Não encontrado'});
        }

        if (resultLogin !== undefined && resultLogin.statusCode == 412) {

          sails.log(responseLogin.error.description);
          return exits.success({ error: responseLogin.error.description, status_code: 412, status_description: 'Pré-condição falhou'});
        }

        if(responseLogin === undefined){
          sails.log('Resposta do serviço sem conteúdo, contate ao administrador do sistema.');
          return exits.success({ error: 'Resposta do serviço sem conteúdo, contate ao administrador do sistema.', status_code: 204, status_description: 'Nenhum conteúdo'});
        }

        sails.log('Logado...');
        sails.log('Acessando serviço citsmart...');
        sails.log('URL do serviço: services/data/query');
        requestJson
          .createClient(inputs.url)
          .post("services/data/query",
            {
              sessionID: responseLogin.sessionID,
              queryName: inputs.byid,
              parameters: { ID: inputs.serviceCode }
            },
            function (errQuery, resultQuery, responseQuery) {

              if (typeof responseQuery.result == 'undefined') {

                sails.log("Código de serviço não foi encontrado!");
                return exits.success(
                  {
                    error: "Código de serviço não foi encontrado!",
                    status_code: 404,
                    status_description: 'Não encontrado'
                  }
                );
              }

              sails.log('Acessando serviço citsmart...');
              sails.log('URL do serviço: services/request/create');
              requestJson
                .createClient(inputs.url)
                .post("services/request/create",
                  {
                    sessionID: responseLogin.sessionID,
                    synchronize: false,
                    sourceRequest: {
                      numberOrigin: new Date().getTime(),
                      type: 'R', // Requisição
                      description: inputs.textUser,
                      userID: inputs.username,
                      contact: { name: "chatbot" },
                      contractID: inputs.contractID,
                      service: { code: inputs.serviceCode }
                    }
                  },
                  function (errCreate, resultCreate, responseCreate) {

                    if (responseCreate.error != null || errCreate) {
                      sails.log('Error: ', responseCreate.error);
                      return exits.success(
                        {
                          error: "Erro ao tentar abrir o chamado, contate o administrador do sistema!",
                          status_code: 500,
                          status_description: 'Erro interno do servidor'
                        }
                      );
                    }

                    let output_text = "Abri a solicitação nº " + responseCreate.request.number;
                    sails.log(output_text);
                    return exits.success({ output_text: output_text, chamado: responseCreate.request.number });
                  });
            });
      }
      );
  }

};

