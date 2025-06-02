import { createRouter, createWebHistory } from "vue-router";
import PaginaInicio from "@/components/Inicio.vue";
import PaginaGaleria from "@/components/Galeria.vue";
import PaginaExposiciones from "@/components/Exposiciones.vue";
import PaginaArtistas from "@/components/Artistas.vue";

const routes = [
  { path: "/", component: PaginaInicio },
  { path: "/galeria", component: PaginaGaleria },
  { path: "/exposiciones", component: PaginaExposiciones },
  { path: "/artistas", component: PaginaArtistas },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;