package com.task02;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.syndicate.deployment.annotations.lambda.LambdaHandler;
import com.syndicate.deployment.model.RetentionSetting;

import java.util.HashMap;
import java.util.Map;

@LambdaHandler(
    lambdaName = "hello_world",
    roleName = "hello_world-role",
    isPublishVersion = true,
    aliasName = "${lambdas_alias_name}",
    logsExpiration = RetentionSetting.SYNDICATE_ALIASES_SPECIFIED
)
public class HelloWorld implements RequestHandler<Map<String, Object>, Map<String, Object>> {

    @Override
    public Map<String, Object> handleRequest(Map<String, Object> request, Context context) {
        // Extract path and method from the request object
        String path = (String) request.get("path");
        String method = (String) request.get("httpMethod");

        Map<String, Object> responseMap = new HashMap<>();

        // Check if the request path is /hello and the HTTP method is GET
        if ("/hello".equals(path) && "GET".equalsIgnoreCase(method)) {
            responseMap.put("statusCode", 200);
            responseMap.put("body", "{\"message\": \"Hello from Lambda\"}");
        } else {
            // Handle other paths or methods with a 400 response
            responseMap.put("statusCode", 400);
            responseMap.put("body", String.format(
                "{\"message\": \"Bad request syntax or unsupported method. Request path: %s. HTTP method: %s\"}", path, method
            ));
        }
        return responseMap;
    }
}
