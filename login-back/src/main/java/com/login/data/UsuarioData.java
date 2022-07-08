package com.login.data;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.login.model.LoginModel;

public class UsuarioData implements UserDetails {

	private static final long serialVersionUID = 1L;
	
	private final Optional<LoginModel> usuario;
	
	public UsuarioData(Optional<LoginModel> usuario) {
		this.usuario = usuario;
	}
	
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return new ArrayList<>();
	}

	@Override
	public String getUsername() {
		return usuario.orElse(new LoginModel()).getLogin();
	}
	
	@Override
	public String getPassword() {
		return usuario.orElse(new LoginModel()).getSenha();
	}
	
	public boolean isAccountNonExpired() {
		return true;
	}
	
	public boolean isAccountNonLocked() {
		return true;
	}
	
	public boolean isCredentialsNonExpired() {
		return true;
	}
	
	public boolean isEnabled() {
		return true;
	}

}
