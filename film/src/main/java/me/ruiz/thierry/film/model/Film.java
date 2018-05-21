package me.ruiz.thierry.film.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;


@Entity
public class Film {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id ;
	
	private String title ;
	
	private String image ;

	@ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
		name = "film_director", 
		joinColumns = @JoinColumn(name = "film_id", referencedColumnName = "id"), 
		inverseJoinColumns = @JoinColumn(name = "director_id", referencedColumnName = "id")
    )
	private Set<Director> directors ;
	
	
	@ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
		name = "film_actor", 
		joinColumns = @JoinColumn(name = "film_id", referencedColumnName = "id"), 
		inverseJoinColumns = @JoinColumn(name = "actor_id", referencedColumnName = "id")
    )
	private Set<Actor> actors ;
		
	
	public Film() {
	}
	
	public Film( String title, String image) {
		this.title = title;
		this.image = image;
	}
	
	public Film(String title, Set< Director> directors, Set< Actor> actors) {
		this.title = title;
		this.directors = directors ;
		this.actors = actors;
	}
	
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public Set<Director> getDirectors() {
		return directors;
	}

	public void setDirectors(Set<Director> directors) {
		this.directors = directors;
	}

	public Set<Actor> getActors() {
		return actors;
	}

	public void setActors(Set<Actor> actors) {
		this.actors = actors;
	}
	
	public String getImage() {
		return image;
	}
	
	public void setImage(String image) {
		this.image = image;
	}

	
}
