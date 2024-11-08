# Case Join Backend

Este é o backend do projeto **Case Join**, uma API RESTful desenvolvida em Java 21 com Spring Boot. A aplicação permite gerenciar produtos, categorias e usuários, incluindo autenticação com JWT, seguindo as melhores práticas de Clean Architecture, SOLID e princípios de código limpo.

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Execução da Aplicação](#execução-da-aplicação)
- [Utilização da API](#utilização-da-api)
    - [Documentação Swagger](#documentação-swagger)
    - [Coleção Postman](#coleção-postman)
- [Scripts SQL de Inicialização](#scripts-sql-de-inicialização)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Boas Práticas Implementadas](#boas-práticas-implementadas)

---

## Funcionalidades

- **Autenticação e Autorização:**
    - Registro e login de usuários.
    - Autenticação baseada em JWT.
    - Proteção de endpoints, permitindo acesso apenas a usuários autenticados.

- **Gerenciamento de Categorias:**
    - CRUD completo para categorias.
    - Validações de campos e retornos de erro amigáveis.

- **Gerenciamento de Produtos:**
    - CRUD completo para produtos.
    - Associação de produtos a categorias.
    - Validações de campos e retornos de erro amigáveis.

- **Documentação Interativa:**
    - Documentação Swagger disponível para facilitar o uso e teste da API.

- **Logger e Tratamento de Erros:**
    - Manipulação global de exceções, retornando mensagens claras em português.

---

## Tecnologias Utilizadas

- **Linguagem:** Java 21
- **Framework:** Spring Boot
- **Banco de Dados:**
    - **Produção:** PostgreSQL
    - **Testes:** H2 Database
- **Segurança:** Spring Security com JWT
- **ORM:** Spring Data JPA
- **Validações:** Jakarta Bean Validation
- **Documentação:** Springdoc OpenAPI (Swagger)
- **Mapeamento de Objetos:** MapStruct
- **Build e Dependências:** Maven
- **Outras Dependências:**
    - Lombok
    - SLF4J (Logging)
    - BCrypt (Hashing de senhas)

---

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- **Java Development Kit (JDK) 21**
- **Apache Maven 3.8+**
- **PostgreSQL 12+**
- **Git**

---

## Configuração do Ambiente

### 1. Clonar o Repositório

### 2. Configurar o Banco de Dados

#### 2.1. Criar Banco de Dados PostgreSQL

Acesse o terminal do PostgreSQL e crie um banco de dados:

```sql
CREATE DATABASE casejoinbackend;
```

#### 2.2. Configurar Usuário e Senha

Crie um usuário ou utilize um existente com permissões adequadas:

```sql
CREATE USER seu_usuario WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE casejoinbackend TO seu_usuario;
```

#### 2.3. Atualizar as Configurações no `application.properties`

Edite o arquivo `src/main/resources/application.properties` e ajuste as propriedades:

```properties
# Configurações do Banco de Dados
spring.datasource.url=jdbc:postgresql://localhost:5432/casejoinbackend
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha
```

### 3. Configurar o Maven

Certifique-se de que o Maven está configurado corretamente e que o Java 21 é a versão padrão.

---

## Execução da Aplicação

### 1. Compilar e Executar com Maven

No diretório raiz do projeto, execute:

```bash
mvn spring-boot:run
```

### 2. Executar a Aplicação via IDE

- Importe o projeto em sua IDE.
- Certifique-se de que a JDK 21 está configurada.
- Execute a classe principal `CaseJoinBackendApplication`.

### 3. Acessar a Aplicação

A aplicação estará disponível em: `http://localhost:8080`

---

## Utilização da API

### 1. Documentação Swagger

A documentação interativa da API está disponível em:

- **Swagger UI:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

Por meio do Swagger UI, você pode visualizar os endpoints disponíveis e testar as requisições diretamente pelo navegador.

### 2. Coleção Postman

Uma coleção do Postman foi preparada para facilitar os testes da API.

#### 2.1. Importar a Coleção

- Baixe o arquivo `postman_collection.json` disponível no repositório.
- No Postman, clique em **"Import"** e selecione o arquivo baixado.

#### 2.2. Utilizar a Coleção

- A coleção está configurada para executar automaticamente o login e armazenar o token JWT.
- Edite as variáveis `base_url`, `jwt_token`, `category_id` e `product_id` conforme necessário.
- Execute as requisições disponíveis para testar os endpoints.

## Executando o Script de Mock de Dados

Para popular o banco de dados com categorias e produtos de mock:

1. Abra o PowerShell no diretório do projeto.
2. Permita a execução de scripts temporariamente:
   ```powershell
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   ```
3. Execute o script:
   ```powershell
   .\script.ps1
   ```

O script irá:
- Cadastrar um usuário e realizar o login para obter o token de autenticação.
- Criar 15 categorias e, para cada uma, 5 produtos com nomes dinâmicos.

---

## Estrutura do Projeto

```
src/
├── main/
│   ├── java/
│   │   └── br/
│   │       └── com/
│   │           └── api/
│   │               └── case_join_backend/
│   │                   ├── application/
│   │                   │   ├── service/
│   │                   │   └── exception/
│   │                   ├── domain/
│   │                   │   ├── entity/
│   │                   │   └── repository/
│   │                   ├── infrastructure/
│   │                   │   └── security/
│   │                   ├── presentation/
│   │                   │   ├── controller/
│   │                   │   ├── dto/
│   │                   │   └── mapper/
│   │                   └── CaseJoinBackendApplication.java
│   └── resources/
│       ├── application.properties
│       ├── application-h2.properties
│       └── application-postgres.properties
└── test/
```

---

## Boas Práticas Implementadas

- **Arquitetura Limpa e Modular:**
    - Separação clara entre camadas: apresentação, aplicação, domínio e infraestrutura.

- **Princípios SOLID e Clean Code:**
    - Classes com responsabilidade única.
    - Dependências invertidas e desacopladas.
    - Nomes significativos e código legível.

- **Padrões de Projeto:**
    - **Repository Pattern:** Abstração do acesso a dados.
    - **DTOs e Mapeadores:** Uso de DTOs para transferência de dados e MapStruct para mapeamento.

- **Validações e Tratamento de Erros:**
    - Validações de campos com mensagens claras em português.
    - Manipulação global de exceções.

- **Segurança:**
    - Autenticação JWT.
    - Senhas hashadas com BCrypt.
    - Proteção de endpoints sensíveis.

- **Documentação:**
    - Swagger UI para documentação interativa.

---
