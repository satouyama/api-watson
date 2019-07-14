/**
 * cloud.setup.js
 *
 * Configuration for this Sails app's generated browser SDK ("Cloud").
 *
 * Above all, the purpose of this file is to provide endpoint definitions,
 * each of which corresponds with one particular route+action on the server.
 *
 * > This file was automatically generated.
 * > (To regenerate, run `sails run rebuild-cloud-sdk`)
 */

Cloud.setup({

  /* eslint-disable */
  methods: {"confirmEmail":{"verb":"GET","url":"/email/confirm","args":["token"]},"findAllUsers":{"verb":"GET","url":"/find-all-users","args":[]},"findAllApps":{"verb":"GET","url":"/find-all-apps","args":[]},"logout":{"verb":"GET","url":"/api/v1/account/logout","args":[]},"signup":{"verb":"POST","url":"/api/v1/account/signup","args":["emailAddress","password","fullName","chatbot_name"]},"editUsers":{"verb":"PUT","url":"/api/v1/users/edit","args":["id","emailAddress","password","fullName","chatbot_name"]},"addApps":{"verb":"POST","url":"/api/v1/apps/add","args":["appsName"]},"editApps":{"verb":"PUT","url":"/api/v1/apps/edit","args":["id","appsName"]},"updatePassword":{"verb":"PUT","url":"/api/v1/account/update-password","args":["password"]},"updateProfile":{"verb":"PUT","url":"/api/v1/account/update-profile","args":["fullName","emailAddress"]},"updateBillingCard":{"verb":"PUT","url":"/api/v1/account/update-billing-card","args":["stripeToken","billingCardLast4","billingCardBrand","billingCardExpMonth","billingCardExpYear"]},"login":{"verb":"PUT","url":"/api/v1/entrance/login","args":["emailAddress","password","chatbot_name","rememberMe"]},"sendPasswordRecoveryEmail":{"verb":"POST","url":"/api/v1/entrance/send-password-recovery-email","args":["emailAddress"]},"updatePasswordAndLogin":{"verb":"POST","url":"/api/v1/entrance/update-password-and-login","args":["password","token"]},"verifyToken":{"verb":"POST","url":"/api/v1/verifyToken"},"sspiAuth":{"verb":"GET","url":"/api/v1/sspiAuth"},"watsonAssistant":{"verb":"POST","url":"/api/v1/message"},"chatImprove":{"verb":"GET","url":"/api/v1/chat-improve/:chatbot_name"},"chatImproveDetails":{"verb":"POST","url":"/api/v1/chat-improve-details"},"chatImproveUpdated":{"verb":"PUT","url":"/api/v1/chat-improve-updated"}}
  /* eslint-enable */

});
