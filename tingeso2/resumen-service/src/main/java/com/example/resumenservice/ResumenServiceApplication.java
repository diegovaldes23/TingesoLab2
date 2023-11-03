package com.example.resumenservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient

public class ResumenServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ResumenServiceApplication.class, args);
	}

}
