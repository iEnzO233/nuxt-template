import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to) => {
    if (process.server) return; // Ensure this middleware only runs on the client
    const authStore = useAuthStore();

    if (!authStore.authenticated && to.name !== 'auth-login') {
        return navigateTo('/auth/login');
    }

    if (authStore.authenticated && to.name === 'auth-login') {
        return navigateTo('/');
    }
});
