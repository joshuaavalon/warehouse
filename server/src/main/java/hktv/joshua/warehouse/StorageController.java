package hktv.joshua.warehouse;

import hktv.joshua.warehouse.entity.*;
import hktv.joshua.warehouse.exception.DuplicateStorageException;
import hktv.joshua.warehouse.exception.MissingLocationException;
import hktv.joshua.warehouse.exception.MissingProductException;
import hktv.joshua.warehouse.exception.MissingStorageException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class StorageController {
    private final ProductRepository productRepository;
    private final LocationRepository locationRepository;
    private final StorageRepository storageRepository;

    @Autowired
    StorageController(StorageRepository storageRepository, ProductRepository productRepository, LocationRepository locationRepository) {
        this.storageRepository = storageRepository;
        this.productRepository = productRepository;
        this.locationRepository = locationRepository;
    }

    @GetMapping("/api/storage")
    public ApiResponse<List<Storage>> getStorage() {
        ArrayList<Storage> storage = new ArrayList<>();
        storageRepository.findAll().forEach(storage::add);
        return new ApiResponse<>(storage);
    }

    @PostMapping("/api/storage")
    public ApiResponse<Storage> addStorage(@RequestBody Storage storage) {
        Storage newStorage;
        try {
            newStorage = storageRepository.save(storage);
        } catch (RuntimeException e) {
            throw new DuplicateStorageException();
        }
        return new ApiResponse<>(newStorage);
    }

    @PostMapping("/api/storage/csv")
    public ApiResponse<Boolean> addStorageCsv(@RequestParam("file") MultipartFile file) {
        try {
            HashMap<Integer, Location> locationCache = new HashMap<>();
            HashMap<Integer, Product> productCache = new HashMap<>();
            InputStream inputStream = file.getInputStream();
            List<Storage> storages = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8)).lines()
                    .map(line -> {
                        String[] segments = line.split(",");
                        if (segments.length != 3) {
                            throw new RuntimeException();
                        }
                        Integer locationId = Integer.valueOf(segments[0]);
                        Integer productId = Integer.valueOf(segments[1]);
                        Location location = locationCache.containsKey(locationId) ? locationCache.get(locationId) : locationRepository.findById(locationId).orElseThrow();
                        locationCache.putIfAbsent(locationId, location);
                        Product product = productCache.containsKey(productId) ? productCache.get(productId) : productRepository.findById(productId).orElseThrow();
                        productCache.putIfAbsent(productId, product);
                        Integer amount = Integer.valueOf(segments[2]);
                        Storage storage = new Storage(amount);
                        storage.setLocation(location);
                        storage.setProduct(product);
                        return storage;
                    }).collect(Collectors.toList());
            storageRepository.saveAll(storages);
        } catch (IOException | RuntimeException e) {
            return new ApiResponse<>(false);
        }
        return new ApiResponse<>(true);
    }

    @PutMapping("/api/storage/{id}")
    public ApiResponse<Storage> updateStorage(@PathVariable Integer id, @RequestBody Storage storage) {
        Storage newStorage;
        Optional<Storage> optStorage = storageRepository.findById(id);
        Storage currentStorage = optStorage.orElseThrow(MissingStorageException::new);
        if (storage.getLocation() == null || storage.getLocation().getId() == null) {
            throw new MissingLocationException();
        }
        Optional<Location> optLocation = locationRepository.findById(storage.getLocation().getId());
        Location currentLocation = optLocation.orElseThrow(MissingLocationException::new);
        if (storage.getProduct() == null || storage.getProduct().getId() == null) {
            throw new MissingProductException();
        }
        Optional<Product> optProduct = productRepository.findById(storage.getProduct().getId());
        Product currentProduct = optProduct.orElseThrow(MissingLocationException::new);
        currentStorage.setLocation(currentLocation);
        currentStorage.setProduct(currentProduct);
        try {
            newStorage = storageRepository.save(currentStorage);
        } catch (RuntimeException e) {
            throw new DuplicateStorageException();
        }
        return new ApiResponse<>(newStorage);
    }

    @DeleteMapping("/api/storage/{id}")
    public ApiResponse<Boolean> deleteStorage(@PathVariable Integer id) {
        storageRepository.deleteById(id);
        return new ApiResponse<>(true);
    }
}