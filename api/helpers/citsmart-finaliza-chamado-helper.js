module.exports = {


  friendlyName: 'Citsmart finaliza chamado helper',


  description: '',


  inputs: {

    numeroChamado: {
      type: 'string',
      example: '1234',
      description: 'Número do chamado aberto',
      required: true
    }

  },


  exits: {
    success: {
      description: 'The requesting user agent has been successfully logged in.',
      extendedDescription:
        `Under the covers, this stores the id of the logged-in user in the session
        as the \`userId\` key.  The next time this user agent sends a request, assuming
        it includes a cookie (like a web browser), Sails will automatically make this
        user id available as req.session.userId in the corresponding action.  (Also note
        that, thanks to the included "custom" hook, when a relevant request is received
        from a logged-in user, that user's entire record from the database will be fetched
        and exposed as \`req.me\`.)`
    },
  },


  fn: async function (inputs, exits) {

    let number = inputs.numeroChamado;
    let requestJson = require('request-json');

    requestJson
      .createClient(sails.config.CITSMART_URL)
      .post('services/login', { userName: sails.config.CITSMART_USERNAME, password: sails.config.CITSMART_PASSWORD },
        function (err, response, body) {

          var dataRequest = {
            sessionID: body.sessionID,
            number: number,
            status: {
              code: "SOLVED",
              details: "Alterando o Status do Chamado - FECHADO"
            }
          };

          requestJson
            .createClient(sails.config.CITSMART_URL)
            .post("services/request/updateStatus ", dataRequest, function (err, response, callback) {
              sails.log('Chamado número ' + number + ' foi finalizado!');
              return exits.success({ status: 'finalizado' });
            });
        }
      );

  }


};

