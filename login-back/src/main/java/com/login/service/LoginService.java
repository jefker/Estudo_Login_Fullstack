package com.login.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.login.model.LoginModel;
import com.login.repository.LoginRepository;

@Service
public class LoginService {

	@Autowired
	private LoginRepository loginRepository;
	
	public List<LoginModel> getLogin (){
		return loginRepository.findAll();
	}
	
	public LoginModel postLogin(LoginModel request) {
		return loginRepository.save(request);
	}
	
	public void deleteLogin(UUID id) {
		loginRepository.deleteById(id);
	}
	
	public LoginModel patchLogin(UUID id, LoginModel request) {
		return loginRepository.findById(id).map(data -> {
			if(request.getEmail() != null ) {
				data.setEmail(request.getEmail());
			}
			if(request.getSenha() != null) {
				data.setSenha(request.getSenha());
			}
			LoginModel updated = loginRepository.save(data);
			return updated;
		}).orElseThrow();
	}
}
