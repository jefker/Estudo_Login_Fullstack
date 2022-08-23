package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import com.login.model.LoginModel;
import com.login.repository.LoginRepository;
import com.login.service.LoginService;

@WebMvcTest
public class ServiceTeste {
		
	@Mock
	private LoginRepository repositoryTest;
	
	@InjectMocks
	private LoginService serviceTest;
	
	public LoginModel retornoEsperado() {
		LoginModel loginModel = new LoginModel();
		loginModel.setId(1);
		loginModel.setNome("joao");
		loginModel.setEmail("joao@gmail.com");
		loginModel.setSenha("joao123");
		return loginModel;
	}
	
	@Before
	public void init() {
		repositoryTest = Mockito.mock(LoginRepository.class);
		serviceTest = new LoginService(repositoryTest);
	}

	@Test
	public void testGetService() {
		List<LoginModel> lista = new ArrayList<LoginModel>();
		when(serviceTest.getLogin()).thenReturn(lista);
		
		List<LoginModel> empLista = serviceTest.getLogin();
		
		assertEquals(empLista.size(), lista.size());
	}
	
	@Test
	public void testPostService() {
		LoginModel loginModel = retornoEsperado();
		when(serviceTest.postLogin(loginModel)).thenReturn(loginModel);
		serviceTest.postLogin(loginModel);
		verify(repositoryTest).save(loginModel);
	}
	
//	@Test
//	public void testDeleteService() {
//		LoginModel loginModel = retornoEsperado();
//		when(serviceTest.deleteLogin(loginModel.getId())).thenReturn(loginModel);
//		serviceTest.deleteLogin(loginModel.getId());
//		verify(repositoryTest).findById(loginModel.getId());
//	}
	
	@Test
	public void testEditarService() throws Exception {
		LoginModel loginModel = retornoEsperado();
		
		when(serviceTest.postLogin(loginModel)).thenReturn(loginModel);
		serviceTest.postLogin(loginModel);
		
		loginModel.setNome("jefte");
		when(serviceTest.patchLogin(1, loginModel)).thenReturn(loginModel);
		
		verify(repositoryTest).save(loginModel);
	}

}
