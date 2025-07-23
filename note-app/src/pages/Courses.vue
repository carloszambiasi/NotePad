<template>
  <div>
    <h1>📘 Cursos</h1>
    <input v-model="course.name" placeholder="Nome do curso" />
    <input v-model="course.duration" placeholder="Duração (ex: 3h)" />
    <button @click="addCourse">Adicionar Curso</button>

    <ul>
      <li v-for="c in courses" :key="c.id">{{ c.name }} - {{ c.duration }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const course = ref({ name: '', duration: '' });
const courses = ref<{ id: number; name: string; duration: string }[]>([]);

onMounted(() => {
  const saved = localStorage.getItem('courses');
  if (saved) courses.value = JSON.parse(saved);
});

watch(courses, () => {
  localStorage.setItem('courses', JSON.stringify(courses.value));
}, { deep: true });

function addCourse() {
  if (!course.value.name || !course.value.duration) return;
  courses.value.unshift({
    id: Date.now(),
    name: course.value.name,
    duration: course.value.duration
  });
  course.value = { name: '', duration: '' };
}
</script>
