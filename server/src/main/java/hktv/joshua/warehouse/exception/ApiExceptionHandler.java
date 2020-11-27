package hktv.joshua.warehouse.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(value = {ApiException.class})
    @ResponseBody
    ResponseEntity<ErrorResponse> handleFileUploadException(HttpServletRequest request, ApiException ex) {
        return new ResponseEntity<>(new ErrorResponse(ex.getMessage()), ex.getStatus());
    }
}
