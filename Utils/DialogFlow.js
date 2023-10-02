const customDialogflow = require("../Models/custom_dialogflow");
const BotExchangeBranch = require("../Models/BotExchangeBranch");
const CustomExchangeResponse_V1 = require("../Models/CustomExchangeResponse_V1");
const PromptDefinition = require("../Models/PromptDefinition");
const userInputType = require("../Models/UserInputType");
const { AutomatedText } = require("../Components/Automated_Text")
const { InputText } = require("../Components/Input_Text")
const { struct } = require("pb-util");
global.payload_call = null
module.exports = async (req, res) => {
    let botExchangeResponse = CustomExchangeResponse_V1;
    botExchangeResponse.nextPromptBehaviors = null;
    let prompts = [PromptDefinition];
    temp_cusPaylod = "";
    botExchangeResponse.customPayload = temp_cusPaylod;
    str_1 = "escalat"
    custom_header = JSON.parse(req.body.botConfig);
    let languageCode = custom_header.customHeaders[0].value;
    let queryText = req.body.userInput;
    let sessionId = req.body.executionInfo;
    if (req.body.userInputType == userInputType.AUTOMATED_TEXT) {
        try {
            botExchangeResponse = await AutomatedText(req);

        } catch (error) {

            console.error('Error:', error);
            throw error;
        }
    }
    else if (req.body.userInputType == userInputType.TEXT) {
        if (req.body.customPayload) {
            payload_call = req.body.customPayload.customPayload.echoValue
        }
        try {
            botExchangeResponse = await InputText(req)
        } catch (error) {
            console.error('Error:', error);
        }
    }
    else if (req.body.userInputType == userInputType.DTMF_AS_TEXT) {
        botExchangeResponse.branchName = BotExchangeBranch.PromptAndCollectNextResponse;
        prompts[0].transcript = "Please Enter Text Only!";
        prompts[0].audioFilePath = "";
        prompts[0].base64EncodedG711ulawWithWavHeader = "";
        prompts[0].mediaSpecificObject = "";
        prompts[0].textToSpeech = "";
    }
    else if (req.body.userInputType == userInputType.BASE64_ENCODED_G711_ULAW_WAV_FILE) {
        botExchangeResponse.branchName = BotExchangeBranch.Error;
        if (req.body.userInputType != "") {
            prompts[0].base64EncodedG711ulawWithWavHeader = "";
            prompts[0].transcript = "Please Enter Text Only!";
            prompts[0].audioFilePath = "";
            prompts[0].mediaSpecificObject = "";
            prompts[0].textToSpeech = "";
        } else {
            prompts[0].transcript = "Not Found";
            prompts[0].audioFilePath = "";
            prompts[0].base64EncodedG711ulawWithWavHeader = "";
            prompts[0].mediaSpecificObject = "";
            prompts[0].textToSpeech = "";
        }
    }
    else if (req.body.userInputType == userInputType.NO_INPUT) {
        let responseData = await customDialogflow.detectIntent(languageCode, queryText, sessionId);
        botExchangeResponse.branchName = BotExchangeBranch.UserInputTimeout;
        botExchangeResponse.intentInfo.intent = "UserInputTimeout";
        botExchangeResponse.intentInfo.intentConfidence = 100;
        prompts[0].transcript = responseData.response.fulfillmentText;
        prompts[0].audioFilePath = "";
        prompts[0].base64EncodedG711ulawWithWavHeader = "";
        prompts[0].mediaSpecificObject = "";
        prompts[0].textToSpeech = "";
    }
    botExchangeResponse.nextPromptSequence.prompts = prompts;
    return botExchangeResponse;
};