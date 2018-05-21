package me.ruiz.thierry.film.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;

import me.ruiz.thierry.film.model.Director;


@RepositoryRestResource(collectionResourceRel = "directors", path = "directors")
public interface DirectorRepository extends JpaRepository<Director, Long> {
	@Query("Select d from Director d where d.lastName like %:name% or d.firstName like %:name%" )
	List<Director> findByNameContaining(@Param("name") String name);
	
	// FIXME full name search
	// https://stackoverflow.com/questions/4732955/java-jpa-search-user-in-database-by-first-and-last-name-return-too-many-resul?rq=1

	@Transactional
    @Modifying
	@Query(value="Delete from Film_Director where director_id=:id", nativeQuery = true)
	void deleteDirectorFilms(@Param("id") long id );
}


