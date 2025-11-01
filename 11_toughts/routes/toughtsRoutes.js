const express = require('express');
const router = express.Router();
const ToughtsController = require('../controllers/ToughtsController');

//importantdo helpers
const  checkAuth  = require('../helpers/auth').checkAuth


router.get('/dashboard', checkAuth,ToughtsController.dashboard);
router.get('/add', checkAuth,ToughtsController.createTought);
router.post('/add', checkAuth,ToughtsController.createToughtSave);
router.post('/delete', checkAuth,ToughtsController.deleteTought);
router.get('/', ToughtsController.showToughts);



module.exports = router;