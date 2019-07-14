/**
 * Log.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    createdAt: { type: 'number', autoCreatedAt: false },
    updatedAt: { type: 'number', autoUpdatedAt: false },
    error: {
      type: 'string',
    },
    status_code: {
      type: 'number',
    },
    status_description: {
      type: 'string'
    },
    chatbot_name: {
      type: 'string',
    },
    date_error: {
      type: 'number'
    }
  },
};

