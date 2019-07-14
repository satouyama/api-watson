module.exports = {


  friendlyName: 'Citsmart atualiza chamado helper',

  description: '',

  inputs: {
    username: {
      type: 'string',
      require: true
    },
    password: {
      type: 'string',
      require: true
    },
    url: {
      type: 'string',
      require: true
    },
    textUser: {
      type: 'string',
      require: true
    },
    chamado: {
      type: 'number',
      require: true
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

        if(resultLogin.statusCode === 404){

          sails.log("URL de login não foi encontrada!");
          return exits.success({error: "URL de login não foi encontrada!",status_code: 404,status_description: 'Não encontrado'});
        }

        if (resultLogin.statusCode == 412) {

          sails.log(responseLogin.error.description);
          return exits.success({ error: responseLogin.error.description, status_code: 412, status_description: 'Pré-condição falhou'});
        }

        sails.log('Logado...');
        requestJson
          .createClient(inputs.url)
          .post("services/request/update",
            {
              sessionID: responseLogin.sessionID,
              synchronize: true,
              request: {
                numberOrigin: new Date().getTime(),
                description: inputs.textUser,
                userID: inputs.username,
                number: inputs.chamado
              }
            },
            function (errUpdate, resultUpdate, responseUpdate) {

              sails.log('Acessando serviço citsmart...');
              sails.log('URL do serviço: services/request/update');
              if (responseUpdate.error != null) {

                return exits.success(
                  {
                    error: "Erro ao tentar abrir o chamado, contate o administrador do sistema!",
                    status_code: 500,
                    status_description: 'Erro interno do servidor'
                  }
                );
              }
              sails.log('Chamado ' + inputs.chamado + ' atualizado com sucesso!');
              return exits.success();
            });
      }
      );
  }

};

