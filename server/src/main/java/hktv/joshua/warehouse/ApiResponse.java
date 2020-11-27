package hktv.joshua.warehouse;

public class ApiResponse<T> {
    private final T data;

    ApiResponse(T data) {
        this.data = data;
    }

    public T getData() {
        return this.data;
    }
}
