package mongodbexample;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MongodbexampleApplication {

    // This pulls the URI from your application.properties
    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;

    public static void main(String[] args) {
        SpringApplication.run(MongodbexampleApplication.class, args);
    }

    // This runs immediately after the app starts
    @PostConstruct
    public void checkConnection() {
        System.out.println("DEBUG: Attempting to connect to MongoDB at: " + mongoUri);
        
        if (mongoUri.contains("localhost")) {
            System.err.println("WARNING: You are still connecting to LOCALHOST!");
        } else {
            System.out.println("SUCCESS: Atlas URI detected.");
        }
    }
}