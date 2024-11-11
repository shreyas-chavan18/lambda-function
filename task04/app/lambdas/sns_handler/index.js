// Import AWS SDK (not required for basic Lambda functions but useful if integrating with other AWS services)
const AWS = require('aws-sdk');

// Export the handler function
exports.handler = async (event, context) => {
    // Log the incoming event
    console.log("Event received:", JSON.stringify(event, null, 2));

    // Implement the Lambda functionality
    console.log("Hello from lambda");

    // Create a response
    const resultMap = {
        statusCode: 200,
        body: "Hello from Lambda"
    };

    // Return the response
    return resultMap;
};
