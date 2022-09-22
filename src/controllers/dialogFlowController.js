require('dotenv').config();
const dialogflow = require("dialogflow");

const GOOGLE_PROJECT_ID = process.env.GOOGLE_PROJECT_ID;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;//.replace(/\\n/gm, '\n');
const DF_LANGUAGE_CODE = process.env.DF_LANGUAGE_CODE;



const credentials = {
    client_email: GOOGLE_CLIENT_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY,
};

const sessionClient = new dialogflow.SessionsClient({
    projectId: GOOGLE_PROJECT_ID,
    credentials,
});

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function sendToDialogFlow(msg, session, source, params) {
    let textToDialogFlow = msg;
    try {
        console.log("project id =  ", GOOGLE_PROJECT_ID);
        console.log("email =  ", GOOGLE_CLIENT_EMAIL);
        console.log("keyss =  ", GOOGLE_PRIVATE_KEY);
        const sessionPath = sessionClient.sessionPath(
            GOOGLE_PROJECT_ID,
            session
        );
        console.log("session = ", sessionPath);
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: textToDialogFlow,
                    languageCode: DF_LANGUAGE_CODE,
                },
            },
        };
        console.log("request MAP = ", request);
        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        console.log("INTENT EMPAREJADO: ", result.intent.displayName);
        let defaultResponses = [];
        if (result.action !== "input.unknown") {
            result.fulfillmentMessages.forEach((element) => {
                if (element.platform === source) {
                    defaultResponses.push(element);
                }
            });
        }
        if (defaultResponses.length === 0) {
            result.fulfillmentMessages.forEach((element) => {
                if (element.platform === "PLATFORM_UNSPECIFIED") {
                    defaultResponses.push(element);
                }
            });
        }
        result.fulfillmentMessages = defaultResponses;
        return result;
        // console.log("se enviara el resultado: ", result);
    } catch (e) {
        console.log("error");
        console.log(e);
    }
}

module.exports = {
    sendToDialogFlow,
};