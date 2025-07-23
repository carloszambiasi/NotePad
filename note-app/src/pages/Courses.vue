<template>
  <div>
    <h1>📘 Cursos</h1>
    <input v-model="course.name" placeholder="Nome do curso" />
    <input v-model="course.duration" placeholder="Duração (ex: 3h)" />
    <button @click="addCourse">Adicionar Curso</button>

    <ul>
      <li v-for="c in courses" :key="c._id">{{ c.name }} - {{ c.duration }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// ✅ URL da API
const API_URL = 'http://localhost:5000';

const course = ref({ name: '', duration: '' });
const courses = ref<{ _id: string; name: string; duration: string }[]>([]);

// 🔽 Buscar cursos do backend
async function fetchCourses() {
  try {
    const res = await fetch(`${API_URL}/courses`);
    courses.value = await res.json();
  } catch (err) {
    console.error('Erro ao buscar cursos:', err);
  }
}

// 🔼 Adicionar curso no backend
async function addCourse() {
  if (!course.value.name || !course.value.duration) return;

  try {
    await fetch(`${API_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(course.value)
    });

    course.value = { name: '', duration: '' };
    fetchCourses(); // Atualiza a lista
  } catch (err) {
    console.error('Erro ao adicionar curso:', err);
  }
}

onMounted(fetchCourses);
</script>
