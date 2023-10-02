const customDialogflow = require("../Models/custom_dialogflow");
const BotExchangeBranch = require("../Models/BotExchangeBranch");
const CustomExchangeResponse_V1 = require("../Models/CustomExchangeResponse_V1");
const PromptDefinition = require("../Models/PromptDefinition");
async function Automated_Text(req)
{
    let botExchangeResponse = CustomExchangeResponse_V1;
    botExchangeResponse.nextPromptBehaviors = null;
    let prompts = [PromptDefinition];
    customHeader = JSON.parse(req.body.botConfig);
    let languageCode = customHeader.customHeaders[0].value;
    let queryText = req.body.userInput;
    let sessionId = req.body.executionInfo;
    let responseData = await customDialogflow.detectIntent(languageCode, queryText, sessionId);
    botExchangeResponse.branchName = BotExchangeBranch.PromptAndCollectNextResponse;
    botExchangeResponse.intentInfo.intent = responseData.response.intent.displayName;
    botExchangeResponse.intentInfo.intentConfidence = 100;
    prompts[0].transcript = responseData.response.fulfillmentText;
    prompts[0].audioFilePath = "";
    prompts[0].base64EncodedG711ulawWithWavHeader = "";
    prompts[0].mediaSpecificObject = "";
    prompts[0].textToSpeech = "";
    console.log(botExchangeResponse)
    return botExchangeResponse
}
module.exports = { Automated_Text }