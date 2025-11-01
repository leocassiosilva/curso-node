const Tought = require('../models/Tought');
const User = require('../models/User');

module.exports = class ToughtsController {
    static async showToughts(req, res) {
        res.render('toughts/home');
    }

    static async dashboard(req, res) {

        const userId = req.session.userid;
        const user = await User.findOne(
            {where: {id: userId},
            include: Tought,
            plain: true}
        );

        //Verificação se o usuario existe
        if(!user) {
            res.redirect('/login');
            return;
        }
        // Converte cada instância de Tought em um objeto simples, pegando apenas os dados (dataValues)
        const toughts = user.Toughts.map((result)=> result.dataValues);

        let emprtyToughts = false;

        if(toughts.length === 0) {
            emprtyToughts = true;
        }

        res.render('toughts/dashboard', {toughts, emprtyToughts});
    }

    static async deleteTought(req, res) {
        //pega o id do pensamento
        const id = req.body.id;

        //pega o id do usuario logado
        const userId = req.session.userid;

        try {
            //deleta o pensamento onde o id do pensamento e o id do usuario batem
            await Tought.destroy({where: {id: id, UserId: userId}});

            // Redireciona o usuário de volta para o dashboard
            req.flash('message', 'Pensamento deletado com sucesso!');

            res.redirect('/toughts/dashboard');
        } catch (error) {
            console.error(error);
            req.flash('error', 'Erro ao deletar pensamento.');
            res.redirect('/toughts/dashboard');
        }
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