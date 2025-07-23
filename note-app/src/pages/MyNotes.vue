<template>
  <div>
    <h1>📒 Minhas Anotações</h1>

    <!-- Filtros -->
    <div class="filters">
      <label>Ordenar por:</label>
      <select v-model="sortOrder">
        <option value="desc">Mais recentes</option>
        <option value="asc">Mais antigas</option>
      </select>
    </div>

    <!-- Tabela de anotações -->
    <table class="note-table">
      <thead>
        <tr>
          <th>Curso</th>
          <th>Título</th>
          <th>Duração</th>
          <th>Data</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="note in paginatedNotes" :key="note.id">
          <td>{{ getCourseName(note.courseId) }}</td>
          <td>{{ note.name }}</td>
          <td>{{ note.duration }}</td>
          <td>{{ formatDate(note.id) }}</td>
          <td>
            <button @click="editNote(note)">Editar</button>
            <button @click="deleteNote(note.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Paginação -->
    <div class="pagination" v-if="totalPages > 1">
      <button :disabled="currentPage === 1" @click="currentPage--">Anterior</button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="currentPage++">Próxima</button>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>Editar Anotação</h3>
        <label>Título</label>
        <input v-model="editData.name" />
        <label>Duração</label>
        <input v-model="editData.duration" />
        <label>Descrição</label>
        <textarea v-model="editData.description"></textarea>
        <div class="modal-actions">
          <button @click="saveEdit">Salvar</button>
          <button @click="cancelEdit">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const notes = ref<any[]>([]);
const courses = ref<any[]>([]);
const showModal = ref(false);
const editData = ref<any>(null);

const sortOrder = ref<'asc' | 'desc'>('desc');
const currentPage = ref(1);
const itemsPerPage = 20;

onMounted(() => {
  const savedNotes = localStorage.getItem("notes");
  const savedCourses = localStorage.getItem("courses");
  if (savedNotes) notes.value = JSON.parse(savedNotes);
  if (savedCourses) courses.value = JSON.parse(savedCourses);
});

function getCourseName(courseId: string) {
  return courses.value.find(c => c.id === courseId)?.name || "Desconhecido";
}

function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

function deleteNote(id: number) {
  notes.value = notes.value.filter(n => n.id !== id);
  localStorage.setItem("notes", JSON.stringify(notes.value));
  if (currentPage.value > totalPages.value) currentPage.value = totalPages.value;
}

function editNote(note: any) {
  editData.value = { ...note };
  showModal.value = true;
}

function saveEdit() {
  const index = notes.value.findIndex(n => n.id === editData.value.id);
  if (index !== -1) {
    notes.value[index] = { ...editData.value };
    localStorage.setItem("notes", JSON.stringify(notes.value));
    showModal.value = false;
  }
}

function cancelEdit() {
  showModal.value = false;
}

// Ordenação
const sortedNotes = computed(() => {
  return [...notes.value].sort((a, b) =>
    sortOrder.value === 'asc' ? a.id - b.id : b.id - a.id
  );
});

// Paginação
const totalPages = computed(() =>
  Math.ceil(sortedNotes.value.length / itemsPerPage)
);

const paginatedNotes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return sortedNotes.value.slice(start, start + itemsPerPage);
});
</script>

<style scoped>
.note-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.note-table th,
.note-table td {
  padding: 10px;
  border: 1px solid #ccc;
}
.note-table button {
  margin-right: 5px;
  padding: 5px 10px;
  background-color: #2f63c0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.note-table button:last-child {
  background-color: crimson;
}

/* Filtros e paginação */
.filters {
  margin-bottom: 1rem;
}
.pagination {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 400px;
}
.modal input,
.modal textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
