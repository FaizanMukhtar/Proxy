const BotExchangeBranch = require("../Models/BotExchangeBranch");
async function customPayload(botExchangeResponse, prompts, responseData) {
    botExchangeResponse.branchName = BotExchangeBranch.PromptAndCollectNextResponse;
    botExchangeResponse.intentInfo.intent = responseData.response.intent.displayName;
    botExchangeResponse.intentInfo.intentConfidence = 100;
    botExchangeResponse.customPayload = struct.decode(responseData.response.fulfillmentMessages[0].payload);
    prompts[0].transcript = "";
    prompts[0].audioFilePath = "";
    prompts[0].base64EncodedG711ulawWithWavHeader = "";
    prompts[0].mediaSpecificObject = "";
    prompts[0].textToSpeech = "";
    botExchangeResponse.nextPromptSequence.prompts = prompts;
    return botExchangeResponse;
}
async function dfoMessage(botExchangeResponse, prompts, responseData) {
    botExchangeResponse.branchName = BotExchangeBranch.PromptAndCollectNextResponse;
    botExchangeResponse.intentInfo.intent = responseData.response.intent.displayName;
    botExchangeResponse.intentInfo.intentConfidence = 100;
    botExchangeResponse.customPayload = struct.decode(responseData.response.fulfillmentMessages[0].payload);
    prompts[0].transcript = responseData.response.fulfillmentText;
    prompts[0].audioFilePath = "";
    prompts[0].base64EncodedG711ulawWithWavHeader = "";
    prompts[0].mediaSpecificObject = struct.decode(responseData.response.fulfillmentMessages[0].payload);
    prompts[0].textToSpeech = "";
    botExchangeResponse.nextPromptSequence.prompts = prompts;
    return botExchangeResponse;
}

module.exports = { customPayload, dfoMessage }