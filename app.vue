<script setup>
const coreStore = useCoreStore();
const toast = useToast();

watch(
    () => coreStore.errors,
    (newErrors) => {
      if (newErrors && newErrors.length > 0) {
        newErrors.forEach((error) => {
          toast.add({
            title: "Error",
            description: error,
            color: "error",
            timeout: 5000,
          });
        });

        coreStore.errors = []; // Clear errors after displaying them
      }
    },
    { deep: true, immediate: true }
);
</script>


<template>
  <div>
    <UApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>

