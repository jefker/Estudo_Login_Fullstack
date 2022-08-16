package com.historia001.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.historia001.model.Historia001Model;
import com.historia001.service.Historia001Service;

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/usuario")
@RestController
public class Historia001Controller {
	
	@Autowired
	private Historia001Service historia001Service;
	
	@GetMapping(value = "/listar")
	public ResponseEntity<List<Historia001Model>> getHistoria001() {
		List<Historia001Model> historia001Model = historia001Service.getHistoria001();
		return new ResponseEntity<List<Historia001Model>>(historia001Model, HttpStatus.OK);
	}
	
	@PostMapping(value = "/salvar")
	public ResponseEntity<Historia001Model> postHistoria001(@RequestBody Historia001Model request){
		Historia001Model historia001Model = historia001Service.postHistoria001(request);
		return new ResponseEntity<Historia001Model>(historia001Model, HttpStatus.CREATED);
	}
	
	@PutMapping(value = "/editar/{id}")
	public ResponseEntity<Historia001Model> patchHistoria001(@PathVariable UUID id, @RequestBody Historia001Model request) {
		Historia001Model historia001Model = historia001Service.patchHistoria001(id, request);
		return new ResponseEntity<Historia001Model>(historia001Model, HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/deletar/{id}")
	public void deleteHistoria001(@PathVariable UUID id) {
		historia001Service.deleteHistoria001(id);
	}

}
