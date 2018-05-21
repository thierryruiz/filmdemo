package me.ruiz.thierry.film.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import me.ruiz.thierry.film.repository.DirectorRepository;

@RestController
public class DirectorController {
	
	@Autowired
    DirectorRepository directorRepository;


	@RequestMapping(value = "/api/deletedirector/{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
		directorRepository.deleteDirectorFilms(id);
		directorRepository.delete(id) ;
    }
	
}
