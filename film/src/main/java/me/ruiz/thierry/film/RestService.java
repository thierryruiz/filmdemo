package me.ruiz.thierry.film;


import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import me.ruiz.thierry.film.model.Actor;
import me.ruiz.thierry.film.model.Director;
import me.ruiz.thierry.film.model.Film;
import me.ruiz.thierry.film.repository.FilmRepository;


@SpringBootApplication
@SuppressWarnings("serial")
public class RestService implements CommandLineRunner{

	
	@SuppressWarnings("unused")
	private static final Logger logger = LoggerFactory.getLogger(RestService.class);

    @Autowired
    private FilmRepository filmRepository;
    	
	public static void main(String[] args) {
		SpringApplication.run(RestService.class, args);
	}

	public void run(String... args) throws Exception {
	
	    // Create some films
		Film pulpFiction = new Film( "Pulp Fiction",
			new HashSet< Director>() {{ 
				add( new Director( "Quentin", "Tarantino" ) ); 
			}},
			new HashSet< Actor>() {{ 
				add( new Actor( "John", "Travolta" ) );
				add( new Actor( "Uma", "Thurman" ) );
				add( new Actor( "Samuel", "Jackson") );
			}}
		);
	    
		Film theBigLebowski = new Film( "The Big Lebowski",
			new HashSet< Director>() {{ 
				add( new Director( "Ethan", "Coen" ) );
				add( new Director( "Joel", "Coen" ) );
			}},
			new HashSet< Actor>() {{ 
				add( new Actor( "Jeff", "Bridges" ) );
				add( new Actor( "John", "Goodman" ) );
				add( new Actor( "John", "Turturro" ) );
			}} 
		);
		
		Film alien = new Film( "Alien",
			new HashSet< Director>() {{ 
				add( new Director( "Ridley", "Scott" ) );
			}},
			new HashSet< Actor>() {{ 
				add( new Actor( "Sigourney", "Weaver" ) );
			}} 
		);
		
		Film theLastJedi = new Film( "The last Jedi",
				new HashSet< Director>() {{ 
					add( new Director( "Rian", "Johnson" ) );
				}},
				new HashSet< Actor>() {{ 
					add( new Actor( "Dasy", "Ridley" ) );
					add( new Actor( "Mark", "Hamill" ) );
					add( new Actor( "Lupita", "Nyongo" ) );
				}} 
			);
		
		
		final Director lambertoBava = new Director( "Lamberto", "Bava" );
		final Actor michaelsopkiw = new Actor( "Michael", "Sopkiw" ) ;
		
		Film blastfighter = new Film( "Blastfighter",
				new HashSet< Director>() {{ 
					add( lambertoBava );
				}},
				new HashSet< Actor>() {{ 
					add( michaelsopkiw );
				}} 
			);
		
		Film apresLaChuteDeNewYork = new Film( "Apres La Chute De New York",
				new HashSet< Director>() {{ 
					add( new Director( "Sergio", "Martino" ) );
				}},
				new HashSet< Actor>() {{ 
					add( michaelsopkiw );
				}} 
			);
		
		Film leMonstreDeLoceanRouge = new Film( "Monster of the Red Ocean",
				new HashSet< Director>() {{ 
					add( lambertoBava );
				}},
				new HashSet< Actor>() {{ 
					add( michaelsopkiw );
				}} 
			);
		
		Film cyborg = new Film( "Cyborg",
				new HashSet< Director>() {{ 
					add( new Director( "John", "Woo" ) );
				}},
				new HashSet< Actor>() {{ 
					add( new Actor( "Jean Claude", "Van Damme" )  );
				}} 
			);
		
		
			
	    Set<Film> films = new HashSet<Film>() ;
	    films.add( blastfighter ) ;
	    films.add( apresLaChuteDeNewYork ) ;
	    films.add( leMonstreDeLoceanRouge ) ;
	    films.add( theLastJedi ) ;
	    films.add( pulpFiction ) ;
	    films.add( cyborg ) ;
	    films.add( theBigLebowski ) ;
	    films.add( alien ) ;
	    
	    filmRepository.save(films) ;
    	
	}


}
