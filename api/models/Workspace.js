/**
 * Workspace.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    tableName: 'workspace',
    attributes: {
      workspace: {
        type: 'string',
      },
      chatbot_name: {
        type: 'string',
      },
      start_message: {
        type: 'string',
      },
    },
  
  };