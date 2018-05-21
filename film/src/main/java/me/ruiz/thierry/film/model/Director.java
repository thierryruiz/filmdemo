package me.ruiz.thierry.film.model;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Director implements Person {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long id ;
	
	private String firstName ;
	
	private String lastName ;
	
	private String image ;

	
	@ManyToMany(mappedBy = "directors")
	private Set<Film> films ;
	
	public Director() {
	}
	
	public Director( @JsonProperty("firstName") String firstName, @JsonProperty("lastName") String lastName ) {
		this.firstName = firstName;
		this.lastName = lastName;
	}
	
	public long getId() {
		return id;
	}

	
	public void setId(long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	public String getImage() {
		return image;
	}
	
	public void setImage(String image) {
		this.image = image;
	}

	public Set<Film> getFilms() {
		return films;
	}

	public void setFilms(Set<Film> films) {
		this.films = films;
	}	
	
}
