const BotExchangeBranch = require("../Models/BotExchangeBranch");
async function override(botExchangeResponse, prompts, responseData) {
    botExchangeResponse.intentInfo.intent = responseData.response.intent.displayName;
    botExchangeResponse.customPayload = struct.decode(responseData.response.fulfillmentMessages[0].payload);
    if (botExchangeResponse.customPayload.content.intent == "OverrideIntent" && botExchangeResponse.customPayload.content.vahExchangeResultBranch == "ReturnControlToScript")
    {
        botExchangeResponse.branchName = BotExchangeBranch.ReturnControlToScript;
    }
    prompts[0].transcript = "";
    prompts[0].audioFilePath = "";
    prompts[0].base64EncodedG711ulawWithWavHeader = "";
    prompts[0].mediaSpecificObject = "";
    prompts[0].textToSpeech = "";
    return botExchangeResponse;
}
module.exports = { override }