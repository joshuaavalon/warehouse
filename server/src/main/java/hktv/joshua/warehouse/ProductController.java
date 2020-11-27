package hktv.joshua.warehouse;

import hktv.joshua.warehouse.entity.Product;
import hktv.joshua.warehouse.entity.ProductRepository;
import hktv.joshua.warehouse.exception.DuplicateProductCodeException;
import hktv.joshua.warehouse.exception.MissingProductException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class ProductController {
    private final ProductRepository repository;

    @Autowired
    ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/api/product")
    public ApiResponse<List<Product>> getProducts() {
        ArrayList<Product> products = new ArrayList<>();
        repository.findAll().forEach(products::add);
        return new ApiResponse<>(products);
    }

    @GetMapping("/api/product/{id}")
    public ApiResponse<Product> getProductByCode(@PathVariable Integer id) {
        Optional<Product> product = repository.findById(id);
        return new ApiResponse<>(product.orElseThrow(MissingProductException::new));
    }

    @PostMapping("/api/product")
    public ApiResponse<Product> addProduct(@RequestBody Product product) {
        Product newProduct;
        try {
            newProduct = repository.save(product);
        } catch (RuntimeException e) {
            Optional<Product> sameCodeProduct = repository.findByCode(product.getCode());
            if (sameCodeProduct.isEmpty()) {
                throw e;
            } else {
                throw new DuplicateProductCodeException();
            }
        }
        return new ApiResponse<>(newProduct);
    }


    @PostMapping("/api/product/csv")
    public ApiResponse<Boolean> addProductCsv(@RequestParam("file") MultipartFile file) {
        try {
            InputStream inputStream = file.getInputStream();
            List<Product> products = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8)).lines()
                    .map(line -> {
                        String[] segments = line.split(",");
                        if (segments.length != 2) {
                            throw new RuntimeException();
                        }
                        return new Product(segments[0], segments[1]);
                    }).collect(Collectors.toList());
            repository.saveAll(products);
        } catch (IOException | RuntimeException e) {
            return new ApiResponse<>(false);
        }
        return new ApiResponse<>(true);
    }

    @PutMapping("/api/product/{id}")
    public ApiResponse<Product> updateProduct(@PathVariable Integer id, @RequestBody Product product) {
        Product newProduct;
        Optional<Product> optProduct = repository.findById(id);
        Product currentProduct = optProduct.orElseThrow(MissingProductException::new);
        currentProduct.setCode(product.getCode());
        currentProduct.setName(product.getName());
        try {
            newProduct = repository.save(currentProduct);
        } catch (RuntimeException e) {
            Optional<Product> sameCodeProduct = repository.findByCode(product.getCode());
            if (sameCodeProduct.isEmpty()) {
                throw e;
            } else {
                throw new DuplicateProductCodeException();
            }
        }
        return new ApiResponse<>(newProduct);
    }

    @DeleteMapping("/api/product/{id}")
    public ApiResponse<Boolean> deleteProduct(@PathVariable Integer id) {
        repository.deleteById(id);
        return new ApiResponse<>(true);
    }
}