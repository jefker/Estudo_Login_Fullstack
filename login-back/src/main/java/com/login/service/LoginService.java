package com.login.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.login.model.LoginModel;
import com.login.repository.LoginRepository;

@Service
public class LoginService {

	@Autowired
	private LoginRepository loginRepository;
	
	public LoginService(LoginRepository loginRepository) {
		this.loginRepository = loginRepository;
	}
	
	public List<LoginModel> getLogin (){
		return loginRepository.findAll();
	}
	
	public LoginModel postLogin(LoginModel request) {
		return loginRepository.save(request);
	}
	
	public void deleteLogin(Integer id) {
		loginRepository.deleteById(id);
	}
	
	public LoginModel patchLogin(Integer id, LoginModel request) throws Exception {
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
