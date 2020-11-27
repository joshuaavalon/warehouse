package hktv.joshua.warehouse.exception;

import org.springframework.http.HttpStatus;

public class DuplicateStorageException extends ApiException {
    public DuplicateStorageException() {
        super(HttpStatus.BAD_REQUEST, "Storage with same product and location already exists.");
    }
}
