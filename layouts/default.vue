<script setup>
const authStore = useAuthStore();

onBeforeMount(async () => {
  // Check if the user is authenticated

  await authStore.checkAuth();
});
</script>

<template>
  <div>
    <aside> aaa </aside>
    <main>
      <header>
        <ThemeSwitcher/> <!-- Theme switch button -->
      </header>
      <NuxtPage/>
    </main>
  </div>
</template>
