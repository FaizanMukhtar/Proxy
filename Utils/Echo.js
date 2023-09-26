const BotExchangeBranch = require("../Models/BotExchangeBranch");
const CustomExchangeResponse_V1 = require("../Models/CustomExchangeResponse_V1");
const PromptDefinition = require("../Models/PromptDefinition");
const userInputType = require("../Models/UserInputType");

module.exports = async (req, res) => {
    let BE_Response = CustomExchangeResponse_V1;
    BE_Response.nextPromptBehaviors = null;
    let userInput = req.body.userInput;
    let prompts = [PromptDefinition];
    if (req.body.userInputType == userInputType.AUTOMATED_TEXT) {
        BE_Response.branchName = BotExchangeBranch.PromptAndCollectNextResponse
        BE_Response.intentInfo.intent = "Welcome";
        BE_Response.intentInfo.intentConfidence = 100;
        prompts[0].transcript = userInput;
    }
    else if (req.body.userInputType == userInputType.TEXT) {
        BE_Response.branchName = BotExchangeBranch.PromptAndCollectNextResponse
        BE_Response.intentInfo.intent = "Text";
        BE_Response.intentInfo.intentConfidence = 100;
        prompts[0].transcript = userInput;
    }
    else if (req.body.userInputType == userInputType.DTMF_AS_TEXT) {
        BE_Response.branchName = BotExchangeBranch.PromptAndCollectNextResponse
        prompts[0].transcript = userInput;
    }
    else if (req.body.userInputType == userInputType.BASE64_ENCODED_G711_ULAW_WAV_FILE) {
        BE_Response.branchName = BotExchangeBranch.PromptAndCollectNextResponse
        if (req.body.userInputType != " ") {
            prompts[0].base64EncodedG711ulawWithWavHeader = req.body.base64wavFile;
        }
        else {
            prompts[0].transcript = "Not Found"
        }
    }
    else if (req.body.userInputType == userInputType.NO_INPUT) {
        BE_Response.branchName = BotExchangeBranch.ReturnControlToScript
        BE_Response.intentInfo.intent = "Text";
        BE_Response.intentInfo.intentConfidence = 100;
        prompts[0].transcript = userInput;
    }
    BE_Response.nextPromptSequence.prompts = prompts;
    return BE_Response;
}
