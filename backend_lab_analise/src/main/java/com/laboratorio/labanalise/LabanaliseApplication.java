package com.laboratorio.labanalise;

import com.laboratorio.labanalise.model.Amostra;
import com.laboratorio.labanalise.model.AmostraProcedimento;
import com.laboratorio.labanalise.model.Analise;
import com.laboratorio.labanalise.model.Procedimento;
import com.laboratorio.labanalise.model.enums.StatusAmostra;
import com.laboratorio.labanalise.repositories.AmostraProcedimentoRepository;
import com.laboratorio.labanalise.repositories.AmostraRepository;
import com.laboratorio.labanalise.repositories.ProcedimentoRepository;
import com.laboratorio.labanalise.services.AnaliseService;
import java.time.LocalDate;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class LabanaliseApplication {
	public LabanaliseApplication() {
	}

	public static void main(String[] args) {
		System.out.println("hello");
		ConfigurableApplicationContext context = SpringApplication.run(LabanaliseApplication.class, args);
		/* AnaliseService analiseService = (AnaliseService)context.getBean(AnaliseService.class);
		Analise analise = analiseService.buscarPorId(1L);
		Amostra amostra = new Amostra("Amostra 01", "Rua das Flores, 123", LocalDate.of(2025, 2, 1), "-23.55052, -46.63331", LocalDate.of(2025, 2, 15), StatusAmostra.EM_ANDAMENTO, "Amostra coletada para análise química.");
		amostra.setAnalise(analise);
		Procedimento procedimento = new Procedimento("Procedimento1812", "um teste fajuto");
		AmostraRepository amostraRepository = (AmostraRepository)context.getBean(AmostraRepository.class);
		ProcedimentoRepository procedimentoRepository = (ProcedimentoRepository)context.getBean(ProcedimentoRepository.class);
		AmostraProcedimentoRepository aamostraProcedimentoRepository = (AmostraProcedimentoRepository)context.getBean(AmostraProcedimentoRepository.class);
		procedimentoRepository.save(procedimento);
		amostraRepository.save(amostra);
		AmostraProcedimento amostraProcedimento = new AmostraProcedimento(amostra, procedimento);
		aamostraProcedimentoRepository.save(amostraProcedimento); */
	}
}