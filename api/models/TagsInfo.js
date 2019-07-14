/**
 * TagsInfo.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    tableName: 'tagsinfo',
    attributes: {
      tag: {
        type: 'string',
      },
      message: {
        type: 'string',
      },
      chatbot_name: {
        type: 'string',
      },
    },
  
  };