exports.handler = async (event) => {
    // Loop through each record (SNS message) in the event
    for (const record of event.Records) {
        // Log the SNS message content to CloudWatch Logs
        console.log('Received SNS message:', record.Sns.Message);
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify('SNS message processed successfully!'),
    };
    return response;
};
