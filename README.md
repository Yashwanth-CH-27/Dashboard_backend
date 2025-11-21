
---

# 🟢 **Backend README (Node.js + Express)**

```md
# Dashboard Backend (Node.js + Express)

  
Frontend: **https://dashboard-frontend-w29h.vercel.app/**

This is the backend API powering the Dashboard Web Application.  
It includes:

- JWT authentication  
- Cookie-based session handling  
- Task CRUD operations  
- Profile management APIs  
- MongoDB database integration  
- CORS configuration for deployed frontend  

---

## 🚀 Features

### 🔐 Authentication (JWT + Cookies)
- `/signUp`  
- `/signIn`  
- `/signOut`  
- Password hashing using bcrypt  
- JWT token stored inside **secure, sameSite=None cookie**  
- Custom `userAuth` middleware for route protection  

### 👤 Profile APIs
- `GET /profile/view` – returns logged-in user  
- `PATCH /profile/edit` – update user details  
- Validation applied for safe updates  

### 📋 Task APIs (CRUD)
- `POST /task/create` – Create a task  
- `GET /task/readall` – Get all tasks for logged-in user  
- `GET /task/read/:id` – Get one task  
- `PUT /task/update/:id` – Edit a task  
- `DELETE /task/delete/:id` – Remove a task  

Each CRUD request is protected using the `userAuth` middleware.

---

## 🛡️ Security

- JWT authentication  
- Cookies set with:  
  ```js
  secure: true,
  sameSite: "None"
