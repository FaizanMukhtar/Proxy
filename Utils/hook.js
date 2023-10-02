module.exports = async (req, res) => {
    console.log("check1:", payload_call)

    const response = {
        "fulfillmentText": payload_call,
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        payload_call
                    ]
                }
            }
        ],
    }
   return response;
}