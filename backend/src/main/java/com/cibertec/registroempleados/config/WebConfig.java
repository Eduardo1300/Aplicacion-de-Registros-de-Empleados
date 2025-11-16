package com.cibertec.registroempleados.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

/**
 * DESACTIVADO - La configuración de CORS se maneja en CorsConfig
 * que es usada por SecurityConfig para evitar conflictos
 */
@Configuration	
public class WebConfig implements WebMvcConfigurer {
	
	// Configuración de CORS desactivada aquí
	// Usar CorsConfig en su lugar
	
	@Override
	public void addCorsMappings(CorsRegistry corsRegistry) {
		// No configurar CORS aquí - ver CorsConfig.java
	}

	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
		converter.setDefaultCharset(StandardCharsets.UTF_8);
		// Configurar los tipos de media soportados con charset
		converter.setSupportedMediaTypes(Arrays.asList(
			MediaType.APPLICATION_JSON,
			new MediaType("application", "json", StandardCharsets.UTF_8),
			new MediaType("application", "*+json", StandardCharsets.UTF_8)
		));
		converters.add(0, converter);
	}
}

