var objCadastraConversa = {
    cadastraConversa: async (req, res) => {
        req.body.date = sails.models.conversa.dateTimeZone();
        let conversa = await Conversa.create(req.body).fetch();
        return res.json(conversa);
    }
};

module.exports = objCadastraConversa;