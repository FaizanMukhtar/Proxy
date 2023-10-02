const BotExchangeBranch = require("../Models/BotExchangeBranch");
async function multiResponse(botExchangeResponse, prompts, responseData, arrayLength) {
    botExchangeResponse.branchName = BotExchangeBranch.PromptAndCollectNextResponse;
    botExchangeResponse.intentInfo.intent = responseData.response.intent.displayName;
    botExchangeResponse.intentInfo.intentConfidence = 100;
    for (let i = 0; i < arrayLength; i++) {
        if (!prompts[i]) {
            prompts.push({ PromptDefinition });
        }
        botExchangeResponse.intentInfo.intentConfidence = 100;
        prompts[i].transcript = responseData.response.fulfillmentMessages[i].text.text[0];
        prompts[i].audioFilePath = "";
        prompts[i].base64EncodedG711ulawWithWavHeader = "";
        prompts[i].mediaSpecificObject = "";
        prompts[i].textToSpeech = "";
    }
    botExchangeResponse.nextPromptSequence.prompts = prompts;
    return botExchangeResponse;
}
module.exports = { multiResponse }