const Tought = require('../models/Tought');
const User = require('../models/User');

module.exports = class ToughtsController {
    static async showToughts(req, res) {
        res.render('toughts/home');
    }

    static async dashboard(req, res) {
        res.render('toughts/dashboard');
    }

    static async createTought(req, res) {
        res.render('toughts/add');
    }

    static async createToughtSave(req, res) {
        const userId = req.session.userid;
        const tought = {
            title: req.body.title,
            UserId: userId
        };

        try {
            await Tought.create(tought);
            req.flash('message', 'Pensamento criado com sucesso!');
            res.redirect('/toughts/dashboard');
        } catch (error) {
            console.error(error);
            req.flash('error', 'Erro ao criar pensamento.');
            res.redirect('/toughts/dashboard');
        }

    }

};