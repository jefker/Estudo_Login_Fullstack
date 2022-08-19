package com.example.demo;

import java.util.UUID;

import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import com.login.repository.LoginRepository;
import com.login.service.LoginService;

class LoginServiceTest {

	@Mock
	LoginRepository repositoryTest;
	
	@InjectMocks
	LoginService serviceTest;
	
	@Before
	public void init() {
		repositoryTest = Mockito.mock(LoginRepository.class);
		serviceTest = new LoginService(repositoryTest);
	}
	
    @Test
    public void deleteLogin() throws Exception {
    		UUID id = UUID.randomUUID();
			serviceTest.deleteLogin(id);
			
    	Mockito.verify(serviceTest, Mockito.times(1)).deleteLogin(id);

    }
}
