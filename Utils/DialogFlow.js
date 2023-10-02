const customDialogflow = require("../Models/custom_dialogflow");
const BotExchangeBranch = require("../Models/BotExchangeBranch");
const CustomExchangeResponse_V1 = require("../Models/CustomExchangeResponse_V1");
const PromptDefinition = require("../Models/PromptDefinition");
const userInputType = require("../Models/UserInputType");
const {Automated_Text}= require("../Components/Automated_Text")
const { struct } = require("pb-util");
global.payload_call="HI"
module.exports = async (req, res) => {
    let botExchangeResponse = CustomExchangeResponse_V1;
    botExchangeResponse.nextPromptBehaviors = null;
    let prompts = [PromptDefinition];
    temp_cusPaylod = "";
    botExchangeResponse.customPayload = temp_cusPaylod;
    str_1="escalat"
    custom_header = JSON.parse(req.body.botConfig);
    let languageCode = custom_header.customHeaders[0].value;
    let queryText = req.body.userInput;
    let sessionId = req.body.executionInfo;
    if (req.body.userInputType == userInputType.AUTOMATED_TEXT) 
    {
        botExchangeResponse=await Automated_Text(req)
    } 
    else if (req.body.userInputType == userInputType.TEXT) {
        if (req.body.customPayload)
        {
            payload_call=req.body.customPayload.customPayload.echoValue
        }

        let responseData = await customDialogflow.detectIntent(languageCode,queryText,sessionId);
        botExchangeResponse.branchName = BotExchangeBranch.PromptAndCollectNextResponse;
        botExchangeResponse.intentInfo.intent = responseData.response.intent.displayName;
        array_lenght = responseData.response.fulfillmentMessages.length;
        
        if (botExchangeResponse.intentInfo.intent.includes("Override")) {
            botExchangeResponse.customPayload = struct.decode(responseData.response.fulfillmentMessages[0].payload);
            if(botExchangeResponse.customPayload.content.intent=="OverrideIntent"&&botExchangeResponse.customPayload.content.vahExchangeResultBranch=="ReturnControlToScript")
            {
                botExchangeResponse.branchName = BotExchangeBranch.ReturnControlToScript;
            }           
            prompts[0].transcript = "";
            prompts[0].audioFilePath = "";
            prompts[0].base64EncodedG711ulawWithWavHeader = "";
            prompts[0].mediaSpecificObject = "";
            prompts[0].textToSpeech = "";
        }
        else if (botExchangeResponse.intentInfo.intent.includes("End")) {
            botExchangeResponse.branchName = BotExchangeBranch.ReturnControlToScript;
            prompts[0].transcript = responseData.response.fulfillmentText;
            prompts[0].audioFilePath = "";
            prompts[0].base64EncodedG711ulawWithWavHeader = "";
            prompts[0].mediaSpecificObject = "";
            prompts[0].textToSpeech = "";
        }
        else if (botExchangeResponse.intentInfo.intent.includes(str_1)) {
            botExchangeResponse.branchName = BotExchangeBranch.ReturnControlToScript;
            prompts[0].transcript = responseData.response.fulfillmentText;
            prompts[0].audioFilePath = "";
            prompts[0].base64EncodedG711ulawWithWavHeader = "";
            prompts[0].mediaSpecificObject = "";
            prompts[0].textToSpeech = "";
        }
        else if (botExchangeResponse.intentInfo.intent == "Default Fallback Intent") {
            botExchangeResponse.branchName = BotExchangeBranch.UserInputNotUnderstood;
            botExchangeResponse.intentInfo.intent = "UserInputNotUnderstood";
            prompts[0].transcript = responseData.response.fulfillmentText;
            prompts[0].audioFilePath = "";
            prompts[0].base64EncodedG711ulawWithWavHeader = "";
            prompts[0].mediaSpecificObject = "";
            prompts[0].textToSpeech = "";
        }
        else if (array_lenght > 1) {
            for (let i = 0; i < array_lenght; i++) {
                if (!prompts[i]) {
                    prompts.push({ PromptDefinition });
                }
                botExchangeResponse.intentInfo.intentConfidence = 100;
                prompts[i].transcript =responseData.response.fulfillmentMessages[i].text.text[0];
                prompts[i].audioFilePath = "";
                prompts[i].base64EncodedG711ulawWithWavHeader = "";
                prompts[i].mediaSpecificObject = "";
                prompts[i].textToSpeech = "";
            }
        }
        else if (responseData.response.fulfillmentMessages[0].payload) {
            if (struct.decode(responseData.response.fulfillmentMessages[0].payload).dfomessage) {
                botExchangeResponse.intentInfo.intentConfidence = 100;
                prompts[0].transcript = responseData.response.fulfillmentText;
                prompts[0].audioFilePath = "";
                prompts[0].base64EncodedG711ulawWithWavHeader = "";
                prompts[0].mediaSpecificObject = struct.decode(responseData.response.fulfillmentMessages[0].payload);
                prompts[0].textToSpeech = "";
            } else {
                temp_cusPaylod = botExchangeResponse.customPayload;
                botExchangeResponse.customPayload = struct.decode(responseData.response.fulfillmentMessages[0].payload);
                prompts[0].transcript = "";
                prompts[0].audioFilePath = "";
                prompts[0].base64EncodedG711ulawWithWavHeader = "";
                prompts[0].mediaSpecificObject = "";
                prompts[0].textToSpeech = "";
            }
        }
        else {
            botExchangeResponse.intentInfo.intentConfidence = 100;
            prompts[0].transcript = responseData.response.fulfillmentText;
            prompts[0].audioFilePath = "";
            prompts[0].base64EncodedG711ulawWithWavHeader = "";
            prompts[0].mediaSpecificObject = "";
            prompts[0].textToSpeech = "";
        }
    } else if (req.body.userInputType == userInputType.DTMF_AS_TEXT) {
        botExchangeResponse.branchName = BotExchangeBranch.PromptAndCollectNextResponse;
        prompts[0].transcript = "Please Enter Text Only!";
        prompts[0].audioFilePath = "";
        prompts[0].base64EncodedG711ulawWithWavHeader = "";
        prompts[0].mediaSpecificObject = "";
        prompts[0].textToSpeech = "";
    } else if (req.body.userInputType == userInputType.BASE64_ENCODED_G711_ULAW_WAV_FILE) {
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
    } else if (req.body.userInputType == userInputType.NO_INPUT) {
        let responseData = await customDialogflow.detectIntent(languageCode,queryText,sessionId);
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