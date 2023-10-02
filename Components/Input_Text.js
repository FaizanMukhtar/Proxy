const customDialogflow = require("../Models/custom_dialogflow");
const BotExchangeBranch = require("../Models/BotExchangeBranch");
const CustomExchangeResponse_V1 = require("../Models/CustomExchangeResponse_V1");
const PromptDefinition = require("../Models/PromptDefinition");
const { customPayload, dfoMessage } = require("./functions/customPayloadRecieved")
const { endInteraction } = require("./functions/endInteraction")
const { escalation } = require("./functions/escalation")
const { inputNotUnderstood } = require("./functions/inputNotUnderstood")
const { multiResponse } = require("./functions/multiResponse")
const { normalText } = require("./functions/normalText")
const { override } = require("./functions/override")

async function InputText(req) {
    let botExchangeResponse = CustomExchangeResponse_V1;
    botExchangeResponse.nextPromptBehaviors = null;
    let prompts = [PromptDefinition];
    customHeader = JSON.parse(req.body.botConfig);
    let languageCode = customHeader.customHeaders[0].value;
    let queryText = req.body.userInput;
    let sessionId = req.body.executionInfo;
    str_1 = "escalat"
    arrayLength = responseData.response.fulfillmentMessages.length;
    let responseData = await customDialogflow.detectIntent(languageCode, queryText, sessionId);
    if (responseData.response.fulfillmentMessages[0].payload) {
        if (struct.decode(responseData.response.fulfillmentMessages[0].payload).dfomessage) {
            try {
                botExchangeResponse = await dfoMessage(botExchangeResponse, prompts, responseData)
            } catch (error) {
                console.error('Error:', error);
            }
        }
        else {
            try {
                botExchangeResponse = await customPayload(botExchangeResponse, prompts, responseData)
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
    else if (arrayLength > 1) {
        try {
            botExchangeResponse = await multiResponse(botExchangeResponse, prompts, responseData, arrayLength)
        } catch (error) {
            console.error('Error:', error);
        }
    }
    else if (responseData.response.intent.displayName == "Default Fallback Intent") {
        try {
            botExchangeResponse = await inputNotUnderstood(botExchangeResponse, prompts, responseData)
        } catch (error) {
            console.error('Error:', error);
        }
    }
    else if (responseData.response.intent.displayName.includes(str_1)) {
        try {
            botExchangeResponse = await escalation(botExchangeResponse, prompts, responseData)
        } catch (error) {
            console.error('Error:', error);
        }
    }
    else if (responseData.response.intent.displayName.includes("End")) {
        try {
            botExchangeResponse = await endInteraction(botExchangeResponse, prompts, responseData)
        } catch (error) {
            console.error('Error:', error);
        }
    }
    else if (botExchangeResponse.intentInfo.intent.includes("Override")) {
        try {
            botExchangeResponse = await override(botExchangeResponse, prompts, responseData)
        } catch (error) {
            console.error('Error:', error);
        }
    }
    else {
        try {
            botExchangeResponse = await normalText(botExchangeResponse, prompts, responseData)
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return botExchangeResponse
}
module.exports = { InputText }