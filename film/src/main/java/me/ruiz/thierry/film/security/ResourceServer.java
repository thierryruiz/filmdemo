package me.ruiz.thierry.film.security;


import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;

@Configuration
@EnableWebSecurity
@EnableResourceServer
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ResourceServer extends ResourceServerConfigurerAdapter {

    public void configure(HttpSecurity http) throws Exception {
    	http    		
    		.csrf().disable()
    		.authorizeRequests()
    		.antMatchers("/oauth/token").permitAll()
	    	.antMatchers(HttpMethod.GET, "/api/**").permitAll()
	    	.antMatchers("/uploads/**").permitAll()
	    	.and()
	    	.authorizeRequests()
	    	.anyRequest().authenticated();
    }
           
    @Override
    public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
        resources.resourceId("film_resource"); 
    }
    
}