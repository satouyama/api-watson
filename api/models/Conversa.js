/**
 * Conversa.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    conversation_id: {
      type: 'string',
    },
    input: {
      type: 'string',
    },
    intent: {
      type: 'string',
    },
    confidence: {
      type: 'number'
    },
    output_text: {
      type: 'string'
    },
    date: { 
      type:'number'
    },
    lat: {
      type: 'number'
    },
    lng: {
      type: 'number'
    },
    observacao: {
      type: 'string'
    },
    correcao: {
      type: 'string'
    },
    chamado: {
      type: 'number'
    },
    chatbot_name: {
      type: 'string'
    },
  },
  /**
   * Selo pai véi de qualidade
   * @return GMT -03:00
   */
  dateTimeZone: function(){

    var moment = require('moment');
    return moment().unix();
  }

};

