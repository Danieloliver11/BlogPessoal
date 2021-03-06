package com.generation.blogPessoal.Security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity  //@EnableWebSecurity na classe que define as regras de segurança
public class BasicSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private UserDetailsService userDetailsService; //injeção de WebSecurityConfigurerAdapter
	
	/* METODO PARA SOBRESCREVER O PADRAO DA CLASSE 'UserDetailsService' */
	@Override													
	protected void configure(AuthenticationManagerBuilder auth)throws Exception{
		auth.userDetailsService(userDetailsService);
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	//As regras de acesso foram definidos pelo HttpSecurity
	@Override
	protected void configure(HttpSecurity http) throws Exception{ 
		http.authorizeRequests()
		.antMatchers("/**").permitAll()
		.antMatchers("/usuarios/logar").permitAll() // <---  libera esses end points para o client ter um acesso sem ter um token.
		.antMatchers("/usuarios/cadastrar").permitAll() // <---  libera esses end points para o client ter um acesso sem ter um token.
		.antMatchers("/tema").permitAll()
        .antMatchers("/tema/{id}").permitAll()
        .antMatchers("/postagem").permitAll()
        .antMatchers("/postagem/{id}").permitAll()
        .antMatchers("/usuarios").permitAll()
        .antMatchers("/usuarios/{id}").permitAll()

		.anyRequest().authenticated() 	/* nao deixar acessar os demais endpoints sem estar	 com um token */
		.and().httpBasic() /* trabalha com uma seguranca basica */
		.and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) /* STATELESS -> nao salva a sessão */
		.and().cors()
		.and().csrf().disable(); /* desabilita as configuracoes padroes */
	}
	

}
