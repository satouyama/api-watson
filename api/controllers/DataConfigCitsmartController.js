var objDataConfigCitsmart = {
    dataConfigCitsmart: async (req, res) => {

        var dataConfigCitsmart = await DataConfigCitsmart.findOne({
            chatbot_name: (req.body.chatbot_name) ? req.body.chatbot_name : '',
        });
        return res.json(dataConfigCitsmart);
    },
};

module.exports = objDataConfigCitsmart;