// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import Courses from "../pages/Courses.vue";
import Notes from "../pages/Notes.vue";
import MyNotes from "../pages/MyNotes.vue"; // <-- NOVO

const routes = [
  { path: "/", name: "Courses", component: Courses },
  { path: "/notes", name: "Notes", component: Notes },
  { path: "/my-notes", name: "MyNotes", component: MyNotes }, // <-- NOVO
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
