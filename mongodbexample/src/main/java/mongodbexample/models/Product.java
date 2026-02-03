package mongodbexample.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
public class Product {
    @Id
    private String id;
    private String name;

    @Indexed(unique = true)
    private String sku;

    private Double price;
    private Integer quantity;
    private Integer lowStockAt;


    private String userId;

    public Product() {}


    // GETTERS AND SETTERS
    public String getId() {return id;}
    public void setId(String id) {this.id = id;}

    public String getName() {return name;}
    public void setName(String name) {this.name = name;} 

    public String getSku() {return sku;}
    public void setSku(String sku) {this.sku = sku;}
    
    public Double getPrice() {return price;}
    public void setPrice(Double price) {this.price = price;} 

    public Integer getQuantity() {return quantity;}
    public void setQuantity(Integer quantity) {this.quantity = quantity;}
    
    public Integer getLowStockAt() {return lowStockAt;}
    public void setLowStockAt(Integer lowStockAt) {this.lowStockAt = lowStockAt;}

     public String getUserId() {return userId;}
    public void setUserId(String userId) {this.userId = userId;}

    



    
}
