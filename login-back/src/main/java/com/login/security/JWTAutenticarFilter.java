package com.login.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.login.data.UsuarioData;
import com.login.model.LoginModel;

public class JWTAutenticarFilter extends UsernamePasswordAuthenticationFilter {

	public static final int TOKEN_EXPIRACAO = 900_000;
	public static final String TOKEN_SENHA = "800dbad0-db68-45e8-93ef-162e7f2a9fd4";
	
	private final AuthenticationManager authenticationManager;
	
	public JWTAutenticarFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}
	
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request,
												HttpServletResponse response) throws AuthenticationException {
		try {
			LoginModel usuario = new ObjectMapper()
					.readValue(request.getInputStream(), LoginModel.class);
			
			return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					usuario.getLogin(),
					usuario.getSenha(),
					new ArrayList<>()
			));
			
		} catch (IOException e) {
			throw new RuntimeException("Falha ao autenticar usuário", e);
		}
	}
	
	@Override
	protected void successfulAuthentication(HttpServletRequest request,
											HttpServletResponse response,
											FilterChain chain,
											Authentication authResult) throws IOException, ServletException {
	
		UsuarioData usuarioData = (UsuarioData) authResult.getPrincipal();
		
		String token = JWT.create()
				.withSubject(usuarioData.getUsername())
				.withExpiresAt(new Date(System.currentTimeMillis() + TOKEN_EXPIRACAO))
				.sign(Algorithm.HMAC512(TOKEN_SENHA));
		
//		response.addHeader("Access-Control-Allow-Origin", "*");
		response.getWriter().write(token);
		response.getWriter().flush();
	}
	
}
