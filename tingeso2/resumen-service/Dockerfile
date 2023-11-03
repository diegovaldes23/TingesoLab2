FROM openjdk:18
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} resumen-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/resumen-service-0.0.1-SNAPSHOT.jar"]