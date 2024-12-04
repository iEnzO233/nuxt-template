import { defineStore } from "pinia";
import { apiRequest } from "~/utils/apiRequest";

export const useAuthStore = defineStore("auth", () => {
    const coreStore = useCoreStore();
    // State
    const token = ref(null);
    const authenticated = ref(false);
    const loading = ref(false);
    const phoneNumber = ref("");
    const otpCode = ref("");
    const otpSent = ref(false);
    const timer = ref(0);
    let timerInterval = null;
    const password = ref("");
    const passwordConfirmation = ref("");
    const forgetPasswordStep = ref(1);
    const profile = ref({
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        phone: "",
        national_code: "",
        address: "",
        postal_code: "",
    });

    // Utility Functions
    const startTimer = () => {
        timer.value = 120;
        timerInterval = setInterval(() => {
            if (timer.value > 0) timer.value--;
            else clearInterval(timerInterval);
        }, 1000);
    };

    const resetOtpState = () => {
        otpSent.value = false;
        otpCode.value = "";
        timer.value = 0;
        if (timerInterval) clearInterval(timerInterval);
    };

    const resetFormState = () => {
        phoneNumber.value = "";
        otpCode.value = "";
        password.value = "";
        passwordConfirmation.value = "";
        otpSent.value = false;
        forgetPasswordStep.value = 1;
        timer.value = 0;
        if (timerInterval) clearInterval(timerInterval);
    };

    // Auth Functions
    const sendOtp = async () => {
        const { data, error } = await apiRequest("/login-register", {
            method: "POST",
            body: { mobile: phoneNumber.value },
        });

        if (!error) {
            otpSent.value = true;
            startTimer();
        }
    };

    const handleLogin = async () => {
        const { data, error } = await apiRequest("/otp", {
            method: "POST",
            body: { mobile: phoneNumber.value, code: otpCode.value },
        });
        let rawData = toRaw(data.data)
        if (rawData) {
            coreStore.saveToken(rawData.token); // Save token to cookie
            setAuthData(rawData.user, rawData.token);
            navigateTo("/");
        } else if (error) {
            console.error("Login failed:", error);
        }
    };

    const loginWithPassword = async () => {
        const { data, error } = await apiRequest("/login", {
            method: "POST",
            body: { mobile: phoneNumber.value, password: password.value },
        });
        let rawData = toRaw(data.data)
        if (rawData) {
            coreStore.saveToken(rawData.token); // Save token to cookie
            setAuthData(rawData.user, rawData.token);
            navigateTo("/");
        } else if (error) {
            console.error("Login failed:", error);
        }
    };

    const sendForgotPasswordOtp = async () => {
        const { data, error } = await apiRequest("/password/forgot", {
            method: "POST",
            body: { mobile: phoneNumber.value },
        });

        if (!error) {
            otpSent.value = true;
            forgetPasswordStep.value = 2;
            startTimer();
        }
    };

    const resetPassword = async () => {
        const { data, error } = await apiRequest("/password/reset", {
            method: "POST",
            body: {
                mobile: phoneNumber.value,
                token: otpCode.value,
                password: password.value,
                password_confirmation: passwordConfirmation.value,
            },
        });

        if (!error) {
            resetFormState();
        }
    };

    const logout = () => {
        coreStore.destroyToken(); // Clear token from cookie
        token.value = null;
        authenticated.value = false;
        profile.value = null;
        navigateTo("/auth/login");
    };


    const checkAuth = async () => {
        const { data, error } = await apiRequest("/check-token", {
            method: "GET",
        });

        if (error) {
            logout(true);
        } else {
            authenticated.value = true;
            token.value = data?.token || null;
        }
    };


    // Helper to process login data
    const setAuthData = (user, authToken) => {
        token.value = authToken;
        authenticated.value = true;
        profile.value = user;
        console.log("User authenticated:", user);
    };


    return {
        // State
        authenticated,
        token,
        loading,
        phoneNumber,
        otpCode,
        otpSent,
        timer,
        password,
        passwordConfirmation,
        forgetPasswordStep,
        profile,

        // Actions
        sendOtp,
        handleLogin,
        loginWithPassword,
        sendForgotPasswordOtp,
        resetPassword,
        logout,
        checkAuth,
        resetOtpState,
        resetFormState,
    };
});
