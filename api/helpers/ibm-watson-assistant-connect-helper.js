module.exports = {


    friendlyName: 'Connection IBM watson assistant helper',
  
    description: 'Connects to ibm watson assistant',
  
    inputs: {
    },
  
    exits: {
      success: {
      },
    },
  
    fn: async function (inputs, exits) {

        // Connect API watson-assistant
        var AssistantV1 = require('watson-developer-cloud/assistant/v1');
        var assistant = new AssistantV1({
            username: sails.config.CONVERSATION_USERNAME,
            password: sails.config.CONVERSATION_PASSWORD,
            url: sails.config.CONVERSATION_URL,
            version: sails.config.VERSION_DATE,
            headers: {
                'X-Watson-Learning-Opt-Out': 'true'
            }
        });

        return exits.success({ assistant: assistant });
    }
  
  };
  
  