package hktv.joshua.warehouse.exception;

import org.springframework.http.HttpStatus;

public class MissingStorageException extends ApiException {
    public MissingStorageException() {
        super(HttpStatus.NOT_FOUND, "Storage cannot be found.");
    }
}
