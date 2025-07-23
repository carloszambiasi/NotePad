<template>
  <div>
    <h1>📝 Anotações</h1>
    <select v-model="note.courseId">
      <option disabled value="">Selecione o curso</option>
      <option v-for="c in courses" :key="c.id" :value="c.id">{{ c.name }}</option>
    </select>
    <input v-model="note.name" placeholder="Título da anotação" />
    <input v-model="note.duration" placeholder="Duração (ex: 30min)" />
    <textarea v-model="note.description" placeholder="Descrição da anotação"></textarea>
    <button @click="addNote">Adicionar Anotação</button>

    <ul>
      <li v-for="n in notes" :key="n.id">
        <strong>{{ getCourseName(n.courseId) }}</strong><br />
        {{ n.name }} - {{ n.duration }}<br />
        {{ n.description }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const note = ref({ courseId: '', name: '', duration: '', description: '' });
const notes = ref<any[]>([]);
const courses = ref<any[]>([]);

onMounted(() => {
  const savedNotes = localStorage.getItem('notes');
  const savedCourses = localStorage.getItem('courses');
  if (savedNotes) notes.value = JSON.parse(savedNotes);
  if (savedCourses) courses.value = JSON.parse(savedCourses);
});

watch(notes, () => {
  localStorage.setItem('notes', JSON.stringify(notes.value));
}, { deep: true });

function addNote() {
  if (!note.value.courseId || !note.value.name || !note.value.duration || !note.value.description) return;
  notes.value.unshift({ id: Date.now(), ...note.value });
  note.value = { courseId: '', name: '', duration: '', description: '' };
}

function getCourseName(id: string) {
  return courses.value.find(c => c.id == id)?.name || "Curso não encontrado";
}
</script>
