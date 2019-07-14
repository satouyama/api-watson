var objTagsInfo = {
    tagsinfo: async (req, res) => {
        // busca workspace
        var tagsinfo = await TagsInfo.findOne({
            tag: (req.body.tag) ? req.body.tag : '',
            chatbot_name: (req.body.chatbot_name) ? req.body.chatbot_name : ''
        });
        return res.json({ tag: tagsinfo.tag, message: tagsinfo.message });
    },
};

module.exports = objTagsInfo;