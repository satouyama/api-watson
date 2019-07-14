/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  hookTimeout               : 60000,

  VERSION                   : 'v2',
  VERSION_DATE              : "2018-09-20",

  CONVERSATION_USERNAME     : "b41326bd-8e10-436f-9656-6fd8c349fef2",
	CONVERSATION_PASSWORD     : "exzZi1p3OlsA",
	CONVERSATION_URL          : "https://gateway.watsonplatform.net/conversation/api",

  CITSMART_USERNAME         : "",
  CITSMART_PASSWORD         : "",
	CITSMART_URL              : "",
  CITSMART_NUMBER_SERVICE   : "3570",
  CITSMART_GET_NAMESERV_BYID: "GET_NAMESERV_BYID",

  /*
  CITSMART_USERNAME         : "consultor",
  CITSMART_PASSWORD         : "1",
  CITSMART_URL              : "http://10.161.50.106:8080/citsmart",
  CITSMART_NUMBER_SERVICE   : "2341",
  CITSMART_GET_NAMESERV_BYID: "GET_NAMESERV_BYID",
  */

  DISCOVERY_VERSION_DATE    : "2017-11-07",
  DISCOVERY_VERSION         : 'v1',
  DISCOVERY_URL             : "https://gateway.watsonplatform.net/discovery/api",
  DISCOVERY_USERNAME        : "8371c0c8-d5af-46f4-bfc9-a930242807ac",
  DISCOVERY_PASSWORD        : "kS7MFZ8Tze3U",
  DISCOVERY_ENVIRONMENT_ID  : "f360f605-d30c-4cd9-aff2-832e44330178",
  DISCOVERY_COLLECTION_ID   : "47eca9ce-c929-4837-89c9-d59d7142caff",
  DISCOVERY_CONFIGURATION_ID: "7aff372b-a3bf-47a3-b586-ec46af91430c"
};
