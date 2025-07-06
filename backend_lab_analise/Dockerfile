# Etapa 1: Usar imagem base com Java 17
FROM eclipse-temurin:17-jdk-alpine

# Etapa 2: Criar diretório de trabalho dentro do container
WORKDIR /app

# Etapa 3: Copiar o .jar gerado no build para dentro do container
COPY target/labanalise-0.0.1-SNAPSHOT.jar app.jar

# Etapa 4: Expor a porta 8080 (padrão do Spring Boot)
EXPOSE 8080

# Etapa 5: Comando para iniciar o app
ENTRYPOINT ["java", "-jar", "app.jar"]
