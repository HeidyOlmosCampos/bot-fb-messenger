const { Router, response} = require('express');
const {getHomePage} = require('../controllers/homepageController');
const {getWebHook, postWebHook} = require('../controllers/chatBotController');
const router = Router();

let initWebRoutes = (app) => {
    router.get('/', getHomePage);
    router.get('/webhook', getWebHook);
    router.post('/webhook', postWebHook);

    return app.use('/', router);
}




module.exports = initWebRoutes;