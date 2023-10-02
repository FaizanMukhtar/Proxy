module.exports = async (req, res) => {

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