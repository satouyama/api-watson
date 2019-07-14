/**
 * Intencao.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  table: 'intencao',
  attributes: {
    intent: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    chatbot_name: {
      type: 'string'
    },
    contractID: {
      type: 'number'
    },
    serviceCode: {
      type: 'number'
    },
  },

};

