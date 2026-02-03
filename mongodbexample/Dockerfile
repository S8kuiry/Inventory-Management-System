# Step 1: Build the jar using Maven and Java 17
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the application and skip tests for a faster deployment
RUN mvn clean package -DskipTests

# Step 2: Run the application using Java 17 Runtime
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the built jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080 (standard for Spring Boot)
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]