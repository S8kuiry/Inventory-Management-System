package mongodbexample.controllers;

import mongodbexample.models.Product;
import mongodbexample.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*", methods = { RequestMethod.GET, RequestMethod.POST,
        RequestMethod.PUT, RequestMethod.DELETE }

)
@RestController
@RequestMapping("/api/products")

public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    // ADD new product
    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        Product savedProduct = productRepository.save(product);
        return ResponseEntity.ok(savedProduct);
    };

    // Get products based on userId
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Product>> getProductsByUserId(@PathVariable String userId) {
        List<Product> products = productRepository.findByUserId(userId);
        return ResponseEntity.ok(products);
    };

    // delete produts by id

    @DeleteMapping("/{id}") // Fixed: added the closing brace '}'
    public ResponseEntity<Void> deleteProductById(@PathVariable String id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // Fixed: added () and ;
        }
        return ResponseEntity.notFound().build(); // Added default return
    };

    // fetch products by id
    // fetch product by id
    @GetMapping("/edit/{id}") // Usually just /{id} for a GET request
    public ResponseEntity<Product> fetchProductById(@PathVariable String id) {
        return productRepository.findById(id)
                .map(product -> ResponseEntity.ok(product)) // If found, return 200 OK
                .orElse(ResponseEntity.notFound().build()); // If not found, return 404
    }

    // update path
    @PutMapping("/update/{id}")
    public ResponseEntity<Product> updateDetailsById(@PathVariable String id, @RequestBody Product productDetails) {
        return productRepository.findById(id)
                .map(existingProduct -> {
                    // 1. Update the fields
                    existingProduct.setName(productDetails.getName());
                    existingProduct.setQuantity(productDetails.getQuantity());
                    existingProduct.setSku(productDetails.getSku());
                    existingProduct.setPrice(productDetails.getPrice());
                    existingProduct.setLowStockAt(productDetails.getLowStockAt());

                    // 2. Save and RETURN the result inside the lambda
                    Product updatedProduct = productRepository.save(existingProduct);
                    return ResponseEntity.ok(updatedProduct);
                }) // The map ends here
                .orElse(ResponseEntity.notFound().build()); // The orElse follows the map
    };

}
