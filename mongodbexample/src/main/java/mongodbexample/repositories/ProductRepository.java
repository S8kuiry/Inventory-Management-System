package mongodbexample.repositories;
import java.util.List;

import mongodbexample.models.Product; // Import your Product model
import org.springframework.data.mongodb.repository.MongoRepository; // Import the Spring helper
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    //                                     ^--- THIS IS THE MISSING PIECE ---^
    // It tells Spring: "This repo is for the Product model, and its ID is a String"
    // this creates a query : {userId : "....."}

    List<Product> findByUserId(String userId);

}
