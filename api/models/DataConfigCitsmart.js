/**
 * Conversa.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'dataconfigcitsmart',
  attributes: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    url: {
      type: 'string',
    },
    numberService: {
      type: 'number',
    },
    byid: {
      type: 'string',
    },
    chatbot_name: {
      type: 'string'
    }
  },

};

