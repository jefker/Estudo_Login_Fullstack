package com.login.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.login.model.LoginModel;
import com.login.service.LoginService;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/usuario")
@RestController
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	
	private final PasswordEncoder password;
	
	public LoginController(LoginService loginService, PasswordEncoder password) {
		this.loginService = loginService;
		this.password = password;
	}

	@GetMapping(value = "/listar")
	public ResponseEntity<List<LoginModel>> getLogin() {
		List<LoginModel> loginModel = loginService.getLogin();
		return new ResponseEntity<List<LoginModel>>(loginModel, HttpStatus.OK);
	}
	
	@PostMapping(value = "/salvar")
	public ResponseEntity<LoginModel> postLogin(@RequestBody LoginModel request){
		request.setSenha(password.encode(request.getSenha()));
		LoginModel loginModel = loginService.postLogin(request);
		return new ResponseEntity<LoginModel>(loginModel, HttpStatus.CREATED);
	}
	
	@PatchMapping(value = "/editar/{id}")
	public ResponseEntity<LoginModel> patchLogin(@PathVariable Integer id, @RequestBody LoginModel request) throws Exception{
		LoginModel loginModel = loginService.patchLogin(id, request);
		return new ResponseEntity<LoginModel>(loginModel, HttpStatus.OK);
	}

	@DeleteMapping(value = "/deletar/{id}")
	public void deleteLogin(@PathVariable Integer id) {
		loginService.deleteLogin(id);
	}
}


