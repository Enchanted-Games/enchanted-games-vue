import { createWebHistory, createRouter } from "vue-router";
import NotFound from "@/components/NotFound";

const routes = [
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
