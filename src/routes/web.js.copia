import express  from "express";
import chatBotController from "../controllers/chatBotController";
import homepageController from "../controllers/homepageController";

let router = express.Router();

let initWebRoutes = (app)=> {
/*    router.get("/", (req, res) => {
        return res.send("Hello world!");
    });
*/
    router.get("/", homepageController.getHomePage);
    router.get("/webhook", chatBotController.getWebhook);
    router.post("/webhook", chatBotController.postWebhook);

    return app.use("/", router);
}

module.exports = initWebRoutes;