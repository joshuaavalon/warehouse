package hktv.joshua.warehouse.exception;

import org.springframework.http.HttpStatus;

public class MissingProductException extends ApiException {
    public MissingProductException() {
        super(HttpStatus.NOT_FOUND, "Product cannot be found.");
    }
}
