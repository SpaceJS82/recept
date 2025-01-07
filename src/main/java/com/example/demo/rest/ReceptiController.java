package com.example.demo.rest;

import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.dao.ReceptRepository;
import com.example.demo.vao.Recept;
import java.util.Optional;
import java.util.logging.Logger;

@CrossOrigin
@RestController
public class ReceptiController {

    Logger logger = Logger.getLogger(ReceptiController.class.getName());

    @Autowired
    ReceptRepository repository;

    @PostMapping("/recepti")
    public Recept postRecept(@RequestBody Recept Recept){
        logger.info("Post Recept " + Recept);
        Recept newRecept = new Recept(Recept.getTitle(), Recept.getDescription(),Recept.getInstructions());
        repository.save(newRecept);
        return newRecept;
    }
    @GetMapping("/recepti")
    public Iterable<Recept> getAllRecept(){
        logger.info("Getting all Recept data");
        return repository.findAll();
    }

    

    @GetMapping("/recepti/{id}")
    public Optional<Recept> getReceptById(@PathVariable("id") int id){
        logger.info("Get Recept by id: " + id);
        return repository.findById(id);
    }


    //update
    @PutMapping("/recepti/{id}")
    public ResponseEntity<Recept> updateRecept(@PathVariable("id") int id, @RequestBody Recept updatedRecept) {
        logger.info("Update Recept with id: " + id);
        Optional<Recept> existingRecept = repository.findById(id);

        if (existingRecept.isPresent()) {
            Recept recept = existingRecept.get();
            recept.setTitle(updatedRecept.getTitle());
            recept.setDescription(updatedRecept.getDescription());
            recept.setInstructions(updatedRecept.getInstructions());
            repository.save(recept);
            return ResponseEntity.ok(recept);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/recepti/{id}")
    public ResponseEntity<Void> deleteRecept(@PathVariable("id") int id) {
        logger.info("Delete Recept with id: " + id);
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}
