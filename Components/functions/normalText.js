const BotExchangeBranch = require("../Models/BotExchangeBranch");
async function normalText(botExchangeResponse, prompts, responseData) {
    botExchangeResponse.branchName = BotExchangeBranch.PromptAndCollectNextResponse;
    botExchangeResponse.intentInfo.intent = responseData.response.intent.displayName;
    botExchangeResponse.intentInfo.intentConfidence = 100;
    prompts[0].transcript = responseData.response.fulfillmentText;
    prompts[0].audioFilePath = "";
    prompts[0].base64EncodedG711ulawWithWavHeader = "";
    prompts[0].mediaSpecificObject = "";
    prompts[0].textToSpeech = "";
    botExchangeResponse.nextPromptSequence.prompts = prompts;
    return botExchangeResponse;
}
module.exports = { normalText }