const UserInputCollectType = require("./UserInputCollectType");
const CollectDtmfRules = require("./CollectDtmfRules");
const PromptBargeConfiguration = require("./PromptBargeConfiguration");
const AudioTranscriptionConfig = require("./AudioTranscriptionConfig");

const AudioCollecetionRules =
{
    collectionType: UserInputCollectType.SEND_UTTERANCE_AUDIO,
    dtmfRules: CollectDtmfRules,
    bargeConfiguration: PromptBargeConfiguration,
    audioTranscriptionConfig: AudioTranscriptionConfig,
}
module.exports = AudioCollecetionRules