package hktv.joshua.warehouse.exception;

import org.springframework.http.HttpStatus;

public class DuplicateLocationCodeException extends ApiException {
    public DuplicateLocationCodeException() {
        super(HttpStatus.BAD_REQUEST, "Location with same code already exists.");
    }
}
