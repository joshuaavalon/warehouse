package hktv.joshua.warehouse.entity;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface LocationRepository extends CrudRepository<Location, Integer> {
    Optional<Location> findByCode(String code);
}