// Import the AWS SDK
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Initialize DynamoDB client
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Retrieve environment variable
const DYNAMODB_TABLE_NAME = process.env.target_table;

exports.handler = async (event) => {
    const principalId = event.principalId;
    const content = event.content;

    // Generate a new UUID and the current timestamp
    const newId = uuidv4();
    const currentTime = new Date().toISOString();

    // Define the item to be inserted into the DynamoDB table
    const item = {
        id: newId,
        principalId: principalId,
        createdAt: currentTime,
        body: content
    };

    // Define parameters for DynamoDB put operation
    const params = {
        TableName: DYNAMODB_TABLE_NAME,
        Item: item
    };

    try {
        // Insert item into DynamoDB
        await dynamoDb.put(params).promise();

        // Construct the event and response objects
        const responseEvent = {
            id: newId,
            principalId: principalId,
            createdAt: currentTime,
            body: content
        };

        const response = {
            statusCode: 201,
            event: responseEvent
        };

        // Return response
        return response;
    } catch (error) {
        // Handle any errors that occur during DynamoDB operation
        console.error("Error inserting item into DynamoDB:", error);
        return {
            statusCode: 500,
            error: "Could not create item"
        };
    }
};
