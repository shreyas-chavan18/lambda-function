// Import AWS SDK (not required for basic Lambda functions but useful if interacting with other AWS services)
const AWS = require('aws-sdk');

// Export the handler function
exports.handler = async (event, context) => {
    // Log each record in the event
    event.Records.forEach(record => {
        console.log("SQS Message:", JSON.stringify(record.body));
    });

    console.log("Hello from lambda");

    // Create a response
    const result = {
        statusCode: 200,
        body: "Hello from Lambda"
    };

    // Return the response
    return result;
};
