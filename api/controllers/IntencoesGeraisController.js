var objIntencoesGerais = {
    intencoesGerais: async (req, res) => {
        // busca dummies
        var intencoesGerais = await IntencoesGerais.findOne({
            name: (req.body.intencoesGerais) ? req.body.intencoesGerais : '',
        });
        return res.json({ intencoesGerais: intencoesGerais });
    },
};

module.exports = objIntencoesGerais;