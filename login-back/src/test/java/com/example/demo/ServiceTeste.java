package com.example.demo;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import com.login.model.LoginModel;
import com.login.repository.LoginRepository;
import com.login.service.LoginService;

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
	
	@Test
	public void testDeleteService() throws Exception {
		LoginModel loginModel = retornoEsperado();
				
		serviceTest.deleteLogin(loginModel.getId());
		
		verify(repositoryTest, times(1)).deleteById(1);
	}
	
	@Test
	public void testEditarService() throws Exception {
		LoginModel loginModel = retornoEsperado();
		
		when(serviceTest.postLogin(loginModel)).thenReturn(loginModel);
		loginModel.setNome("kevin");
		serviceTest.postLogin(loginModel);
		
		verify(repositoryTest).save(loginModel);
	}
	
}
