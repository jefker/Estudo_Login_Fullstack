package com.login.service;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.login.data.UsuarioData;
import com.login.model.LoginModel;
import com.login.repository.LoginRepository;

@Component
public class DetalheUsuarioServiceImpl implements UserDetailsService {

	private final LoginRepository repository;
	
	public DetalheUsuarioServiceImpl(LoginRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<LoginModel> usuario = repository.findByLogin(username);
		if (usuario.isEmpty()) {
			throw new UsernameNotFoundException("Usuário [" + username + "] não encontrado");
		}
		
		return new UsuarioData(null);
	}

}
