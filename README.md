# 🎨 To-Do App Frontend (Angular)

A clean and responsive **To-Do List** web app built with **Angular** and **TypeScript**, connected to a Spring Boot backend.

---

## 🚀 Tech Stack
- **Angular 17+**
- **TypeScript**
- **HTML5 / CSS3**
- **Reactive Forms & HttpClient**

---

## ⚙️ Setup & Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/<frontend-repo>.git
   cd <frontend-repo>
Install dependencies

bash
Copy code
npm install
Run the app

bash
Copy code
npm start
App will run at 👉 http://localhost:4200

Backend connection
Ensure your Spring Boot backend is running at:

arduino
Copy code
http://localhost:8080
Update the API base URL in:

bash
Copy code
src/app/services/todo.service.ts
✨ Features
➕ Add new tasks

🖊️ Edit existing tasks

✅ Mark tasks as completed

🔄 Restore or permanently delete completed tasks

📱 Responsive and user-friendly UI

📁 Folder Structure
bash
Copy code

src/app/

 ├── todos/           # Active tasks component
 
 ├── completed/       # Completed tasks component
 
 ├── services/        # Todo service for API calls
 
 ├── models/          # Todo interface
 
 ├── app.config.ts    # Routing configuration
 
 ├── app.html / .ts   # Root application files
 
🧠 Notes
Optimized for both desktop and mobile.

Modern minimal UI with clear task separation.

CORS enabled on backend for local connection.
