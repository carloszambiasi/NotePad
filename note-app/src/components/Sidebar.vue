<template>
  <nav class="sidebar">
    <h2>📚 Navegação</h2>
    <router-link to="/">Cursos</router-link>
    <router-link to="/notes">Anotações</router-link>
    <router-link to="/my-notes">Minhas Anotações</router-link>

  </nav>
</template>

<style scoped>
.sidebar {
  width: 220px;
  background: #2f63c0;
  color: white;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}
a {
  color: white;
  margin-top: 1rem;
  text-decoration: none;
}
a.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
