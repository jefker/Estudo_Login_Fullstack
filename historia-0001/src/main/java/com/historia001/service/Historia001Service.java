package com.historia001.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.historia001.model.Historia001Model;
import com.historia001.repository.Historia001Repository;

@Service
public class Historia001Service {

	@Autowired
	private Historia001Repository historia001Repository;
	
	public List<Historia001Model> getHistoria001(){
		return historia001Repository.findAll();
	}
	
	public Historia001Model postHistoria001(Historia001Model request) {
		return historia001Repository.save(request);
	}
	
	public void deleteHistoria001(UUID id) {
		historia001Repository.deleteById(id);
	}
	
	public Historia001Model patchHistoria001(UUID id, Historia001Model request) {
		return historia001Repository.findById(id).map(data -> {
			if(request.getNome() != null) {
				data.setNome(request.getNome());
			}
			if(request.getTelefone() != null) {
				data.setTelefone(request.getTelefone());
			}
			Historia001Model updated = historia001Repository.save(data);
			return updated;
		}).orElseThrow();
	}
}
