// package mongodbexample;

// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication
// public class MongodbexampleApplication {

// 	public static void main(String[] args) {
// 		SpringApplication.run(MongodbexampleApplication.class, args);
// 	}

// }

package mongodbexample;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MongodbexampleApplication {

    public static void main(String[] args) {
        try {
            SpringApplication.run(MongodbexampleApplication.class, args);
        } catch (Exception e) {
            e.printStackTrace(); // This forces the hidden error to show up!
        }
    }
}
