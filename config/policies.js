/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  '*' : 'is-logged-in',

  // Bypass the `is-logged-in` policy for:
  'assistant/watsonAssistant': true,
  'workspace/workspace': true,
  'tagsinfo/tagsinfo': true,
  'intencoesGerais/intencoesGerais': true,
  'criaChamadoCitsmart/criaChamado': true,
  'atualizaChamadoCitsmart/atualizaChamado': true,
  'cadastraConversaCitsmart/cadastraConversa': true,
};
