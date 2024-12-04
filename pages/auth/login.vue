<template>
  <div class="login-form-wrapper">
    <UCard class="max-w-md mx-auto mt-10 p-8 shadow-lg">
      <LoginForm />
      <ForgetPassword />
    </UCard>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth'
})

</script>
