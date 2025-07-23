<template>
  <div>
    <h1>📝 Anotações</h1>

    <select v-model="note.courseId">
      <option disabled value="">Selecione o curso</option>
      <option v-for="c in courses" :key="c._id" :value="c._id">{{ c.name }}</option>
    </select>

    <input v-model="note.name" placeholder="Título da anotação" />
    <input v-model="note.duration" placeholder="Duração (ex: 30min)" />
    <textarea v-model="note.description" placeholder="Descrição da anotação"></textarea>
    <button @click="addNote">Adicionar Anotação</button>

    <ul>
      <li v-for="n in notes" :key="n._id">
        <strong>{{ getCourseName(n.courseId) }}</strong><br />
        {{ n.name }} - {{ n.duration }}<br />
        {{ n.description }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const API_URL = 'http://localhost:5000';

const note = ref({
  courseId: '',
  name: '',
  duration: '',
  description: ''
});

const notes = ref<any[]>([]);
const courses = ref<any[]>([]);

// Buscar cursos e notas ao carregar
onMounted(async () => {
  try {
    const resCourses = await fetch(`${API_URL}/courses`);
    courses.value = await resCourses.json();

    const resNotes = await fetch(`${API_URL}/notes`);
    notes.value = await resNotes.json();
  } catch (err) {
    console.error('Erro ao carregar dados:', err);
  }
});

async function addNote() {
  if (!note.value.courseId || !note.value.name || !note.value.duration || !note.value.description) return;

  try {
    await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note.value)
    });

    // Atualiza a lista
    const resNotes = await fetch(`${API_URL}/notes`);
    notes.value = await resNotes.json();

    note.value = { courseId: '', name: '', duration: '', description: '' };
  } catch (err) {
    console.error('Erro ao adicionar anotação:', err);
  }
}

function getCourseName(courseId: string) {
  const course = courses.value.find(c => c._id === courseId);
  return course ? course.name : "Curso não encontrado";
}
</script>
