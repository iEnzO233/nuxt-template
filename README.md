
# Ready-to-Use Nuxt Template 🚀

Welcome to the **Ready-to-Use Nuxt Template**! This project is designed to provide developers with a comprehensive starting point for building web applications using **Nuxt 3**. With built-in utilities, global error handling, authentication, and responsive UI components, this template is the perfect foundation for your next project. 🌟

---

## 🌟 Features & Benefits

### 1. **API Proxy Handling**
- Centralized API handling via `/api/handleRequest`.
- Proxy-based API requests to hide backend URLs and prevent CORS issues.
- Simplifies API integration with a clean and reusable `apiRequest` utility.

### 2. **Secure Authentication**
- OTP-based login and password-based login supported out of the box.
- Forgot password flow with OTP verification.
- Secure token storage using Nuxt's `useCookie` composable.

### 3. **Global Error Management**
- Centralized error tracking using Pinia's **Core Store**.
- Automatic error display as toast notifications using Nuxt UI.
- User-friendly error messages with support for backend validation errors.

### 4. **Modern UI/UX**
- Built with **Nuxt UI** for beautiful, responsive components.
- Clean, accessible, and themeable design.
- Dark mode support powered by **@nuxtjs/color-mode**.

### 5. **Optimized Developer Workflow**
- **Nuxt 3** for server-side rendering (SSR) and static site generation (SSG).
- **Pinia** for modular and scalable state management.
- Simplified folder structure and reusable utilities for rapid development.

### 6. **Advanced Query Watching**
- A custom `useWatchQuery` composable for monitoring and debouncing route query changes.
- Ideal for pagination, filtering, and search use cases.

---

## 🛠️ Technologies Used

- [**Nuxt 3**](https://nuxt.com) - The progressive Vue framework.
- [**Pinia**](https://pinia.vuejs.org/) - Simple, intuitive state management.
- [**VueUse**](https://vueuse.org/) - Utility-first Vue composition functions.
- [**Nuxt UI**](https://ui3.nuxt.dev/) - Prebuilt components for seamless UI.
- [**@nuxtjs/color-mode**](https://color-mode.nuxtjs.org/) - Theme management with dark mode.

---

## 📁 Project Structure

```
.
├── /server/
│   ├── /api/
│   │   └── handleRequest.js       # Server-side API proxy
├── /stores/
│   ├── core.js                   # Core store for token and error handling
│   ├── auth.js                   # Authentication store
├── /utils/
│   ├── apiRequest.js             # API request utility
├── /components/
│   ├── LoginForm.vue             # Login form component
│   ├── ForgetPassword.vue        # Forgot password component
├── /pages/
│   ├── auth/
│   │   └── login.vue             # Login page
├── nuxt.config.js                # Nuxt configuration
├── .env                          # Environment variables
└── README.md                     # Documentation
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/iEnzO233/nuxt-template.git
cd nuxt-template
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and configure your backend URL:

```env
NUXT_PUBLIC_BACK_BASE_URL='http://your-backend-url.com/api/v1'
```

### 4. Run the Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` to view the application.

---

## 📚 Usage Guide

### **Authentication**
- **OTP Login**: Mobile-based authentication with OTP support.
- **Password Login**: Traditional username/password login method.
- **Forgot Password Flow**: Reset passwords with OTP verification.
- Token management is handled securely with cookies.

### **API Proxying**
- All API requests go through `/api/handleRequest` to:
  - Prevent exposing backend URLs.
  - Resolve CORS issues.
- Centralized request handling ensures a clean and secure architecture.

### **Error Management**
- Errors are captured in the **Core Store**.
- Automatically displayed as toast notifications using Nuxt UI.

### **Responsive Forms**
- Powered by **Nuxt UI**, forms are accessible, responsive, and easily customizable.

---

## 📷 Screenshots

### Login Page
![Login Page](https://via.placeholder.com/800x400?text=Login+Page)

### Dark Mode
![Dark Mode](https://via.placeholder.com/800x400?text=Dark+Mode)

---

## 🤝 Contributions

Contributions are welcome! Feel free to fork this repository and submit a pull request with your improvements.

---

## 🛡️ License

This project is licensed under the MIT License. See `LICENSE` for more details.

---

## ❤️ Acknowledgements

- [Nuxt.js](https://nuxt.com) for the framework.
- [VueUse](https://vueuse.org/) for their powerful utilities.
- [Nuxt UI](https://ui3.nuxt.dev/) for their beautiful component library.

---

This template is your ideal starting point for building robust and modern web applications. Happy coding! 🎉
