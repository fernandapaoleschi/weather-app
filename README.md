# 🌤️ Weather App — Previsão do Tempo Inteligente

Aplicação full-stack de previsão do tempo que consome a API **Open-Meteo** e fornece não apenas dados climáticos, mas também **recomendações inteligentes de roupas e atividades** com base no clima.

Projeto desenvolvido com foco em boas práticas, tipagem forte e organização de código.

---

## 🚀 Funcionalidades

- Buscar clima atual pelo nome da cidade  
- Exibir temperatura, vento e descrição do clima  
- Recomendações inteligentes de roupas  
- Sugestão de atividades baseadas no clima  
- Tratamento de erros (cidade inválida, falha de API)  
- Interface responsiva e moderna  
- Mudança de estilo visual conforme clima  

---

## 🧩 Stack utilizada

### Frontend
- Next.js  
- TypeScript  
- Tailwind CSS  
- Fetch API  

### Backend
- NestJS  
- TypeScript  
- Arquitetura REST  
- DTOs para tipagem  

### API Externa
- Open-Meteo API  
  - Geocoding  
  - Forecast (clima atual)

---

## 📂 Estrutura do projeto

```
/backend
  /src
    /weather
      weather.controller.ts
      weather.service.ts
      weather.dto.ts

/frontend
  /components
  /pages
  /services
```

---

## ⚙️ Como rodar o projeto

### 1️⃣ Clonar repositório

```bash
git clone https://github.com/seu-usuario/weather-app.git
```

---

### 2️⃣ Rodar Backend

```bash
cd backend
npm install
npm run start:dev
```

Servidor disponível em:

```
http://localhost:3001
```

---

### 3️⃣ Rodar Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicação disponível em:

```
http://localhost:3000
```

---

## 🔑 Variáveis de ambiente

Criar `.env` no frontend:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## ✅ Casos de teste realizados

### ✔️ Caso válido
Entrada: Recife  
- Clima exibido corretamente  
- Recomendações geradas

### ✔️ Caso inválido
Entrada: "xyzabc"  
- Mensagem "Cidade não encontrada" exibida corretamente

### ✔️ Caso extremo
Temperaturas muito baixas  
- Recomendações de casaco pesado e atividades indoor

---

## 🔧 Desafios enfrentados

### Conversão cidade → coordenadas
Algumas cidades retornavam múltiplos resultados.  
**Solução:** usar o primeiro resultado válido.

### Weather codes numéricos
Open-Meteo usa códigos numéricos.  
**Solução:** mapear para descrições legíveis.

### Tratamento de erros
Erros da API quebravam a aplicação.  
**Solução:** implementar try/catch e validações.

---

## ⭐ Diferencial do projeto

Sistema de **recomendações inteligentes**, que sugere:

- Roupas adequadas ao clima  
- Itens úteis (guarda-chuva, protetor solar)  
- Atividades ideais para o clima  

Isso adiciona lógica de negócio real ao projeto.

---

## 📈 Melhorias futuras

- Histórico de buscas  
- Gráficos de previsão do tempo  
- Login e cidades favoritas  
- Deploy em nuvem  
- Testes automatizados

---

## 👩‍💻 Autora

**Fernanda Paoleschi**  
Estudante de Engenharia Eletrônica  
Apaixonada por tecnologia e desenvolvimento full-stack 🚀
