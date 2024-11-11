// Import the AWS SDK
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

// Initialize DynamoDB client
const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Retrieve environment variable
const DYNAMODB_TABLE_NAME = process.env.target_table;

exports.handler = async (event) => {
    try {
        // Extract parameters from the request
        const principalId = event.principalId;
        const content = event.content;

        // Generate a new UUID and get the current timestamp in ISO 8601 format
        const newId = uuidv4();
        const currentTime = new Date().toISOString();

        // Define the item for insertion in DynamoDB
        const item = {
            id: newId,
            principalId: principalId,
            createdAt: currentTime,
            body: content
        };

        // Prepare parameters for the DynamoDB put operation
        const params = {
            TableName: DYNAMODB_TABLE_NAME,
            Item: item
        };

        // Insert item into DynamoDB
        await dynamoDb.put(params).promise();

        // Construct the response with status code and event data
        const response = {
            statusCode: 201,  // Explicitly setting 201 as expected
            event: {
                id: newId,
                principalId: principalId,
                createdAt: currentTime,
                body: content
            }
        };

        return response;

    } catch (error) {
        // Log and return an error response with a status code of 500
        console.error("Error inserting item into DynamoDB:", error);
        return {
            statusCode: 500,
            error: "Could not create item"
        };
    }
};
