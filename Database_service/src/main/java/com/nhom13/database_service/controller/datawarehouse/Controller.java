package com.nhom13.database_service.controller.datawarehouse;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.nhom13.database_service.constant.ApiStatus;
import com.nhom13.database_service.constant.MessageCode;
import com.nhom13.database_service.http.request.SearchRequest;
import com.nhom13.database_service.http.response.Response;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.validation.Valid;
import java.util.Arrays;

@RestController
@RequestMapping(value = "/data-warehouse",produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin("*")
public class Controller {
    Gson gson = new Gson();

    @PostMapping("/search")
    public ResponseEntity<String> search(@RequestBody @Valid SearchRequest request) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        HttpEntity <SearchRequest> entity = new HttpEntity<>(request, headers);
        headers.setContentType(MediaType.APPLICATION_JSON);
        ResponseEntity<String> response = restTemplate.exchange("http://localhost:9000/search", HttpMethod.POST, entity, String.class);
        JsonArray responseData;
        if (response.getStatusCode().equals(HttpStatus.OK)) {
            JsonObject result = gson.fromJson(response.getBody(), JsonObject.class).getAsJsonObject("result");
            HttpEntity<String> getTaskResult = new HttpEntity<>(headers);
            ResponseEntity<String> taskResponse =  restTemplate.exchange("http://localhost:9000/result/" + result.get("toanmath").getAsString(), HttpMethod.GET, getTaskResult , String.class);
            if (taskResponse.getStatusCode().equals(HttpStatus.OK)) {
                responseData = gson.fromJson(taskResponse.getBody(), JsonArray.class);
            }
            else {
                return ResponseEntity.ok(gson.toJson(new Response(ApiStatus.DATA_WAREHOUSE_ERROR, MessageCode.DATA_WAREHOUSE_ERROR)));
            }
            taskResponse =  restTemplate.exchange("http://localhost:9000/result/" + result.get("onluyen").getAsString(), HttpMethod.GET, getTaskResult , String.class);
            if (taskResponse.getStatusCode().equals(HttpStatus.OK)) {
                responseData.addAll(gson.fromJson(taskResponse.getBody(), JsonArray.class));
            }
            else {
                return ResponseEntity.ok(gson.toJson(new Response(ApiStatus.DATA_WAREHOUSE_ERROR, MessageCode.DATA_WAREHOUSE_ERROR)));
            }
            taskResponse =  restTemplate.exchange("http://localhost:9000/result/" + result.get("tracnghiem").getAsString(), HttpMethod.GET, getTaskResult , String.class);
            if (taskResponse.getStatusCode().equals(HttpStatus.OK)) {
                responseData.addAll(gson.fromJson(taskResponse.getBody(), JsonArray.class));
            }
            else {
                return ResponseEntity.ok(gson.toJson(new Response(ApiStatus.DATA_WAREHOUSE_ERROR, MessageCode.DATA_WAREHOUSE_ERROR)));
            }
            taskResponse =  restTemplate.exchange("http://localhost:9000/result/" + result.get("thuviendethi").getAsString(), HttpMethod.GET, getTaskResult , String.class);
            if (taskResponse.getStatusCode().equals(HttpStatus.OK)) {
                responseData.addAll(gson.fromJson(taskResponse.getBody(), JsonArray.class));
            }
            else {
                return ResponseEntity.ok(gson.toJson(new Response(ApiStatus.DATA_WAREHOUSE_ERROR, MessageCode.DATA_WAREHOUSE_ERROR)));
            }
        }
        else {
            return ResponseEntity.ok(gson.toJson(new Response(ApiStatus.DATA_WAREHOUSE_ERROR, MessageCode.DATA_WAREHOUSE_ERROR)));
        }
        return ResponseEntity.ok(gson.toJson(new Response(ApiStatus.SUCCESS, MessageCode.SUCCESS, responseData)));
    }

    @PostMapping("/search-from-web")
    public ResponseEntity<String> searchFromWeb(@RequestBody @Valid SearchRequest request, @RequestParam String web) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        HttpEntity <SearchRequest> entity = new HttpEntity<>(request, headers);
        headers.setContentType(MediaType.APPLICATION_JSON);
        ResponseEntity<String> response = restTemplate.exchange("http://localhost:9000/search/" + web, HttpMethod.POST, entity, String.class);
        JsonArray responseData;
        if (response.getStatusCode().equals(HttpStatus.OK)) {
            responseData = gson.fromJson(response.getBody(), JsonArray.class);
        }
        else {
            return ResponseEntity.ok(gson.toJson(new Response(ApiStatus.DATA_WAREHOUSE_ERROR, MessageCode.DATA_WAREHOUSE_ERROR)));
        }
        return ResponseEntity.ok(gson.toJson(new Response(ApiStatus.SUCCESS, MessageCode.SUCCESS, responseData)));
    }

}
