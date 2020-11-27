package hktv.joshua.warehouse.exception;

import org.springframework.http.HttpStatus;

public class DuplicateProductCodeException extends ApiException {
    public DuplicateProductCodeException() {
        super(HttpStatus.BAD_REQUEST, "Product with same code already exists.");
    }
}
