# Dockerfile para Spring Boot (Java 21)
# Etapa 1: Build
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml pom.xml
COPY src src
RUN mvn clean package -DskipTests

# Etapa 2: Imagen final
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/registro-empleados-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
