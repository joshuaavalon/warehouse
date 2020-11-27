package hktv.joshua.warehouse;

import hktv.joshua.warehouse.entity.Location;
import hktv.joshua.warehouse.entity.LocationRepository;
import hktv.joshua.warehouse.exception.DuplicateLocationCodeException;
import hktv.joshua.warehouse.exception.MissingLocationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
public class LocationController {
    private final LocationRepository repository;
    Logger logger = LoggerFactory.getLogger(LocationController.class);

    @Autowired
    LocationController(LocationRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/api/location")
    public ApiResponse<List<Location>> getLocations() {
        ArrayList<Location> locations = new ArrayList<>();
        repository.findAll().forEach(locations::add);
        return new ApiResponse<>(locations);
    }

    @GetMapping("/api/location/{id}")
    public ApiResponse<Location> getLocationByCode(@PathVariable Integer id) {
        Optional<Location> location = repository.findById(id);
        return new ApiResponse<>(location.orElseThrow(MissingLocationException::new));
    }

    @PostMapping("/api/location")
    public ApiResponse<Location> addLocation(@RequestBody Location location) {
        Location newLocation;
        try {
            newLocation = repository.save(location);
        } catch (RuntimeException e) {
            Optional<Location> sameCodeLocation = repository.findByCode(location.getCode());
            if (sameCodeLocation.isEmpty()) {
                throw e;
            } else {
                throw new DuplicateLocationCodeException();
            }
        }
        return new ApiResponse<>(newLocation);
    }


    @PostMapping("/api/location/csv")
    public ApiResponse<Boolean> addLocationCsv(@RequestParam("file") MultipartFile file) {
        try {
            InputStream inputStream = file.getInputStream();
            List<Location> locations = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8)).lines()
                    .map(line -> {
                        String[] segments = line.split(",");
                        if (segments.length != 2) {
                            throw new RuntimeException();
                        }
                        return new Location(segments[0], segments[1]);
                    }).collect(Collectors.toList());
            repository.saveAll(locations);
        } catch (IOException | RuntimeException e) {
            return new ApiResponse<>(false);
        }
        return new ApiResponse<>(true);
    }

    @PutMapping("/api/location/{id}")
    public ApiResponse<Location> updateLocation(@PathVariable Integer id, @RequestBody Location location) {
        Location newLocation;
        Optional<Location> optLocation = repository.findById(id);
        Location currentLocation = optLocation.orElseThrow(MissingLocationException::new);
        currentLocation.setCode(location.getCode());
        currentLocation.setName(location.getName());
        try {
            newLocation = repository.save(currentLocation);
        } catch (RuntimeException e) {
            Optional<Location> sameCodeLocation = repository.findByCode(location.getCode());
            if (sameCodeLocation.isEmpty()) {
                throw e;
            } else {
                throw new DuplicateLocationCodeException();
            }
        }
        return new ApiResponse<>(newLocation);
    }

    @DeleteMapping("/api/location/{id}")
    public ApiResponse<Boolean> deleteLocation(@PathVariable Integer id) {
        repository.deleteById(id);
        return new ApiResponse<>(true);
    }
}