package com.laboratorio.labanalise;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Profile;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@Profile("test")
public class TestLabAnaliseApplication {
    // Empty test configuration
}