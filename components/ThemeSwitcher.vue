<template>
  <UButton @click="toggleTheme" class="p-2">
    {{ isDark ? 'Light Mode' : 'Dark Mode' }}
  </UButton>
</template>

<script setup>
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggleTheme() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>
