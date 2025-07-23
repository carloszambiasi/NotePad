# 📝 NotePad – Aplicação Fullstack de Anotações

Uma aplicação completa para gerenciamento de cursos e anotações. Criada com Vue 3 (frontend) e Node.js + Express + MongoDB (backend).

---

## ⚙️ Tecnologias

### Frontend
- [Vue 3](https://vuejs.org/)
- TypeScript
- Vite

### Backend
- Node.js
- Express
- MongoDB com Mongoose
- Dotenv
- Cors

---

## 📦 Estrutura do Projeto

```
NotePad/
│
├── note-api/           # Backend Node.js com Express e Mongoose
│   ├── models/         # Models de Mongoose
│   ├── routes/         # Rotas da API
│   └── server.js       # Entrada principal do backend
│
├── note-app/           # Frontend Vue 3
│   ├── src/
│   │   ├── pages/      # Courses.vue, Notes.vue, MyNotes.vue
│   │   └── App.vue
│   └── vite.config.ts
│
├── .gitignore
├── package.json        # Scripts para rodar tudo junto com concurrently
└── README.md
```

---

## 🧪 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/carloszambiasi/NotePad.git
cd NotePad
```

### 2. Instale as dependências do projeto principal

```bash
npm install
```

> Isso instalará `concurrently` para rodar o frontend e backend simultaneamente.

### 3. Configure seu `.env`

Crie um arquivo `.env` dentro de `note-api/`:

```
MONGO_URI=mongodb://localhost:27017/notepad
PORT=5000
```

> Você pode usar MongoDB local ou um cluster do [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### 4. Execute tudo com um único comando

```bash
npm run dev
```

Esse comando vai:
- Rodar o backend na porta `5000`
- Rodar o frontend (Vue) na porta `5173`

---

## 🌐 Rotas da API

### Cursos (`/courses`)
- `GET /courses` – Listar todos
- `POST /courses` – Criar novo

### Anotações (`/notes`)
- `GET /notes` – Listar todas
- `POST /notes` – Criar nova
- `PUT /notes/:id` – Editar anotação
- `DELETE /notes/:id` – Remover anotação

---

## ✅ Funcionalidades

- Cadastro de cursos
- Cadastro de anotações com vínculo ao curso
- Edição e exclusão de anotações
- Modal para edição
- Filtros de ordenação por data (asc/desc)
- Paginação de 20 anotações por página
- Integração com MongoDB
- Interface moderna e responsiva

---

## 👨‍💻 Autor

Desenvolvido por [Carlos Zambiasi](https://github.com/carloszambiasi)

---

## 📃 Licença

MIT License.
