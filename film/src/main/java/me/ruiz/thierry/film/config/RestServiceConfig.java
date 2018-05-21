package me.ruiz.thierry.film.config;


import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import me.ruiz.thierry.film.model.Actor;
import me.ruiz.thierry.film.model.Director;
import me.ruiz.thierry.film.model.Film;


@Configuration
public class RestServiceConfig extends RepositoryRestConfigurerAdapter {	

    @Bean
    public FilterRegistrationBean corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration().applyPermitDefaultValues();
        config.addAllowedMethod(HttpMethod.DELETE);
        config.addAllowedMethod(HttpMethod.PUT);
        config.addAllowedMethod(HttpMethod.PATCH);
        source.registerCorsConfiguration("/**", config);
        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
        bean.setOrder(0);
        return bean;
    }
    
    
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
    	Class<?>[] exposedIds = {Film.class, Actor.class, Director.class};  	
        config.exposeIdsFor(exposedIds);
    }

}