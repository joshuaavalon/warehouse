package hktv.joshua.warehouse.exception;

import org.springframework.http.HttpStatus;

public class MissingLocationException extends ApiException {
    public MissingLocationException() {
        super(HttpStatus.NOT_FOUND, "Location cannot be found.");
    }
}
