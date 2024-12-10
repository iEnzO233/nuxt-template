<script setup>
import { fa_ir } from '@nuxt/ui/locale'
</script>


<template>
  <div>
    <UApp :locale="fa_ir">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>

