
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

    public Map<String, Object> handleRequest(Map<String, Object> request, Context context) {
        Map<String, Object> resultMap = new HashMap<>();
        
        // Extract path and method from the request
        String path = (String) request.getOrDefault("path", "");
        String method = (String) request.getOrDefault("httpMethod", "");

        if ("/hello".equals(path) && "GET".equalsIgnoreCase(method)) {
            // Valid request to /hello with GET method
            resultMap.put("statusCode", 200);
            resultMap.put("message", "Hello from Lambda");
        } else {
            // Any other path or method - return 400 error
            resultMap.put("statusCode", 400);
            resultMap.put("message", String.format("Bad request syntax or unsupported method. Request path: %s. HTTP method: %s", path, method));
        }
        
        return resultMap;
    }
}

