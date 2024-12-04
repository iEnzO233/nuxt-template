<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

// State
const loginMethod = ref("otp"); // Default to OTP login ('otp', 'password')
const form = ref({
  mobile: "",
  password: "",
  otp: "",
});
const errors = ref({
  mobile: "",
  password: "",
  otp: "",
});

// Toggle login method (OTP or Password)
const toggleLoginMethod = () => {
  loginMethod.value = loginMethod.value === "password" ? "otp" : "password";
  authStore.resetFormState();
  clearErrors();
};

// Clear validation errors
const clearErrors = () => {
  errors.value = {
    mobile: "",
    password: "",
    otp: "",
  };
};

// Custom validation
const validateForm = () => {
  let valid = true;

  if (!authStore.phoneNumber) {
    errors.value.mobile = "Mobile number is required.";
    valid = false;
  } else if (!/^\d{10,15}$/.test(authStore.phoneNumber)) {
    errors.value.mobile = "Invalid mobile number.";
    valid = false;
  } else {
    errors.value.mobile = "";
  }

  if (loginMethod.value === "password" && !authStore.password) {
    errors.value.password = "Password is required.";
    valid = false;
  } else {
    errors.value.password = "";
  }

  if (loginMethod.value === "otp" && authStore.otpSent && !authStore.otpCode) {
    errors.value.otp = "OTP is required.";
    valid = false;
  } else {
    errors.value.otp = "";
  }

  return valid;
};

// Handle form submission
const handleFormSubmit = async () => {
  if (!validateForm()) return;

  try {
    if (loginMethod.value === "password") {
      await authStore.loginWithPassword();
    } else if (loginMethod.value === "otp") {
      if (authStore.otpSent) {
        await authStore.handleLogin();
      } else {
        await authStore.sendOtp();
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
</script>

<template>
  <UForm @submit="handleFormSubmit">
    <!-- Mobile Number Input -->
    <UFormField label="Mobile Number" name="mobile">
      <UInput
          v-model="authStore.phoneNumber"
          placeholder="Enter your mobile number"
      />
      <p v-if="errors.mobile" class="text-red-500 text-sm">{{ errors.mobile }}</p>
    </UFormField>

    <!-- Password Input -->
    <UFormField v-if="loginMethod === 'password'" label="Password" name="password">
      <UInput
          v-model="authStore.password"
          type="password"
          placeholder="Enter your password"
      />
      <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
    </UFormField>

    <!-- OTP Input -->
    <UFormField v-if="authStore.otpSent && loginMethod === 'otp'" label="OTP Code" name="otp">
      <UPinInput v-model="authStore.otpCode" :length="6" class="justify-between" />
      <p v-if="errors.otp" class="text-red-500 text-sm">{{ errors.otp }}</p>
    </UFormField>

    <!-- Submit Button -->
    <UButton type="submit" class="w-full mt-4">
      {{ loginMethod === "password"
        ? "Login with Password"
        : authStore.otpSent
            ? "Verify OTP"
            : "Send OTP" }}
    </UButton>

    <!-- Toggle Login Method -->
    <div class="flex justify-between mt-4">
      <button
          type="button"
          class="text-blue-500 underline"
          @click="toggleLoginMethod"
      >
        {{ loginMethod === "password" ? "Login with OTP" : "Login with Password" }}
      </button>
    </div>
  </UForm>
</template>

