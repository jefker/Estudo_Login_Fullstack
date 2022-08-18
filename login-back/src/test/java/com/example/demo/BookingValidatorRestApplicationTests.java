package com.example.demo;

import java.time.LocalDate;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
class BookingValidatorRestApplicationTests {
	
	@Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private BookingService service;
    
    @Test
    void case1() throws Exception {
    	LocalDate checkIn = string2LocalDate("2020-01-02");
    	LocalDate checkOut = string2LocalDate("2020-01-03");
    	
    	BookingInfo bookingInfo = new BookingInfo(checkIn, checkOut);
    	
    	mockMvc.perform(post("/bookings")
    			.contentType("application/json")
    			.content(objectMapper.writeValueAsString(bookingInfo)))
    			.andExpect(status().isOk());
    	
    	BookingReturn bookReturn = service.getWeeksAndExtraNigths(bookingInfo);
    	
        // metodos JUnit versão anterior
        assertThat(bookReturn.getWeeks()).isEqualTo(0);
        assertThat(bookReturn.getDaysAfter()).isEqualTo(0);
        assertThat(bookReturn.getDaysBefore()).isEqualTo(1);

        // JUnit5
        Assertions.assertEquals(bookReturn.getWeeks(), 0);
        Assertions.assertEquals(bookReturn.getDaysAfter(), 0);
        Assertions.assertEquals(bookReturn.getDaysBefore(), 1);
    }

    
	private LocalDate string2LocalDate(String string) {
		// TODO Auto-generated method stub
		return null;
	}
    

}
