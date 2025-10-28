# 🎬 Favorite Movies & TV Shows API

A simple RESTful API built with **Node.js**, **Express**, and **TypeScript** that allows users to **add**, **view**, and **delete** their favorite movies and TV shows.

---

## 🚀 Features
- Add your favorite movies or TV shows  
- Retrieve all favorite entries  
- Delete any movie or show by ID  
- Input validation with Zod (if used)  
- Organized TypeScript structure (controllers, routes, models, validators)  
- MongoDB integration (optional or replaceable DB layer)

---

## 🧰 Tech Stack
- **Node.js**  
- **Express.js**  
- **TypeScript**  
- **Zod** (for validation)  
- **MongoDB / Mongoose**  
- **dotenv** for environment variables  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/jugalsahu/Favorite-Movies-TV-Shows-API.git
cd Favorite-Movies-TV-Shows-API
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Set up environment variables
Create a `.env` file in the root folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/favoritesDB
```

### 4️⃣ Run the project
For development:
```bash
npm run dev
```
For production build:
```bash
npm run build
npm start
```

---

## 🧪 API Usage Guide

### 🔹 Base URL
```
http://localhost:5000/api
```

---

### 📌 1. Get All Favorites
**Endpoint:**  
```
GET /api/favorites
```

**Description:**  
Fetches all saved favorite movies and TV shows.

**Response Example:**
```json
[
  {
    "_id": "672ecf77a1b2f0c3d1234567",
    "title": "Inception",
    "type": "movie",
    "rating": 9.0,
    "createdAt": "2025-10-28T09:10:00.123Z"
  },
  {
    "_id": "672ecf8da1b2f0c3d7654321",
    "title": "Breaking Bad",
    "type": "tv-show",
    "rating": 9.5,
    "createdAt": "2025-10-28T09:15:00.456Z"
  }
]
```

---

### 📌 2. Add a New Favorite
**Endpoint:**  
```
POST /api/favorites
```

**Description:**  
Adds a new movie or TV show to your favorites list.

**Request Body Example:**
```json
{
  "title": "The Dark Knight",
  "type": "movie",
  "rating": 9.1
}
```

**Response Example:**
```json
{
  "message": "Favorite added successfully",
  "data": {
    "_id": "672ed010a1b2f0c3d9876543",
    "title": "The Dark Knight",
    "type": "movie",
    "rating": 9.1,
    "createdAt": "2025-10-28T09:20:00.789Z"
  }
}
```

---

### 📌 3. Delete a Favorite
**Endpoint:**  
```
DELETE /api/favorites/:id
```

**Description:**  
Deletes a favorite by its ID.

**Example:**
```bash
DELETE /api/favorites/672ed010a1b2f0c3d9876543
```

**Response Example:**
```json
{
  "message": "Favorite deleted successfully"
}
```

---

## 🧩 Folder Structure
```
src/
├── controller/
│   └── entry.controller.ts
├── model/
│   └── entry.model.ts
├── routes/
│   └── entry.routes.ts
├── validators/
│   └── entry.validators.ts
├── main.ts
```

---

## 🧑‍💻 Contributing
1. Fork the repo  
2. Create your feature branch (`git checkout -b feature-name`)  
3. Commit your changes (`git commit -m "Added feature"`)  
4. Push to the branch (`git push origin feature-name`)  
5. Create a Pull Request  

---

## 📄 License
This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author
**Jugal Sahu**  
🔗 [GitHub Profile](https://github.com/jugalsahu)
