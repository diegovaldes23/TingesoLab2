package com.example.resumenservice.repositories;


import com.example.resumenservice.entities.ResumenEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ResumenRepository extends CrudRepository<ResumenEntity,Long> {
}
