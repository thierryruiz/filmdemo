package me.ruiz.thierry.film.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import me.ruiz.thierry.film.RestService;

@Configuration
@Order(Ordered.LOWEST_PRECEDENCE)
public class AuthenticationProvider extends WebSecurityConfigurerAdapter {

	@SuppressWarnings("unused")
	private static final Logger logger = LoggerFactory.getLogger(RestService.class);
	
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .inMemoryAuthentication()
            	.withUser("admin").password("admin").roles("ADMIN");
    }
    
    
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
    
}