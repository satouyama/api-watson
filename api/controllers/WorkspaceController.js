var objWorkspace = {
    workspace: async (req, res) => {
        // busca workspace
        var workspace = await Workspace.findOne({
            chatbot_name: (req.body.chatbot_name) ? req.body.chatbot_name : '',
        });
        return res.json({ workspace: workspace.workspace, start_message: workspace.start_message });
    },
};

module.exports = objWorkspace;