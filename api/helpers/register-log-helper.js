module.exports = {


    friendlyName: 'Log helper',
  
    description: 'Register log database',
  
    inputs: {
        error: {
            type: 'string',
            required: true
        }, 
        status_code: {
            type: 'number',
            required: true
        }, 
        status_description: {
            type: 'string',
            required: true
        }, 
        chatbot_name: {
            type: 'string',
            required: true
        },
        date_error: {
            type: 'number',
            required: true
        }, 
    },
  
    exits: {
      success: {
      },
    },
  
    fn: async function (inputs, exits) {

        var log = await Log.create(
            { 
                error: inputs.error, 
                status_code: inputs.status_code, 
                status_description: inputs.status_description, 
                chatbot_name: inputs.chatbot_name,
                date_error: inputs.date_error
            }
        ).fetch();
        sails.log('ID do log é: ' + log.id);
        return exits.success({log: 'ID do log é: ' + log.id});
    }
  
  };
  
  