package hktv.joshua.warehouse.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
public class Storage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;
    private Integer amount;

    protected Storage() {
    }

    public Storage(Integer amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return String.format("Storage[amount=%d]", amount);
    }

    public Integer getId() {
        return id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Integer getAmount() {
        return amount;
    }

}