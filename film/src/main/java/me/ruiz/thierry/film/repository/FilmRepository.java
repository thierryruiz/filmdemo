package me.ruiz.thierry.film.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import me.ruiz.thierry.film.model.Film;

@RepositoryRestResource(collectionResourceRel = "films", path = "films")
public interface FilmRepository extends JpaRepository<Film, Long> {
	@Query("Select f from Film f where f.title like %:title%")
	List<Film> findByTitleContaining(@Param("title") String title);
	
	@Transactional
    @Modifying
	@Query(value="Delete from Film_Actor where film_id=:id", nativeQuery = true)
	void deleteFilmActors(@Param("id") long id );
	
	@Transactional
	@Modifying()
	@Query(value="Delete from Film_Director where film_id=:id", nativeQuery = true)
	void deleteFilmDirectors(@Param("id") long id );

	
}
