exports.handler = async (event) => {
    // Loop through each record (message) in the SQS event
    for (const record of event.Records) {
        // Log the message body to CloudWatch
        console.log('Received message:', record.body);
    }

    const response = {
        statusCode: 200,
        body: 'Processed SQS messages',
    };
    return response;
};
