package com.example.demo;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import com.login.controller.LoginController;
import com.login.repository.LoginRepository;
import com.login.service.LoginService;

public class ControllerTeste {

	@Mock
	private LoginRepository repositoryTest;

	@InjectMocks
	private LoginController controllerTest;
	
	@InjectMocks
	private LoginService serviceTest;

	@Before
	public void init() {
		repositoryTest = Mockito.mock(LoginRepository.class);
		controllerTest = new LoginController(serviceTest, null);
	}
	
	@Test
	public void testGetController() {
		System.out.println("Hello World");
	}

}