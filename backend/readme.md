# 📂 File Parser CRUD API with Progress Tracking

This project is a backend application built with **Express.js** and **MongoDB** that allows you to:

- Upload files (CSV, JSON, TXT)  
- Track upload and parsing progress  
- Parse files asynchronously  
- Retrieve parsed content  
- Perform CRUD operations on uploaded files  

---

## 🚀 Features
- Upload files asynchronously with progress tracking  
- Retrieve file metadata and parsed data  
- List all uploaded files  
- Delete files (both from database and uploads folder)  
- Supports large file uploads without blocking  

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **File Upload:** Multer  
- **Parsing:** CSV (`csv-parser`), JSON, TXT  
- **Environment Management:** dotenv  

---

## 📂 Folder Structure

```
Backend/
├── controllers/
│   └── fileController.js      # Handles API logic for upload, progress, get, delete
├── models/
│   └── fileModel.js           # Mongoose schema for files
├── routes/
│   └── fileRoutes.js          # Express routes for file APIs
├── services/
│   └── fileService.js         # Handles async parsing and progress updates
├── utils/
│   └── parseFile.js           # File parsing logic for CSV, JSON, TXT
├── uploads/                   # Folder to store uploaded files
├── app.js                     # Express app configuration
├── server.js                  # Entry point to start server
├── config.js                  # MongoDB connection configuration
├── package.json               # Project dependencies
└── .env                       # Environment variables (PORT, MONGO_URI, UPLOAD_DIR)
```

---

## ⚡ Setup Instructions

### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/J-S-Nafeez/file-parser-api.git
cd /Backend
```

### 2️⃣ **Install Dependencies**
```bash
npm install
```

### 3️⃣ **Create .env File**
```ini
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/fileparserdb
UPLOAD_DIR=uploads
```

### 4️⃣ **Start the Server**
```bash
npm start
```
Server runs on: http://localhost:5000

---

## 🌐 API Endpoints

### 1️⃣ Upload File
**POST** `/api/files`

- **Headers:** `Content-Type: multipart/form-data`
- **Body:** Form-data with key `file`

**Response Example (Success 201):**
```json
{
  "_id": "64e8f5c1a1234567890abcd",
  "fileId": "uuid-generated-fileid",
  "filename": "sample.csv",
  "filepath": "uploads/1692547890-sample.csv",
  "status": "uploading",
  "progress": 0,
  "parsedData": null,
  "createdAt": "2025-08-20T14:51:12.000Z"
}
```

### 2️⃣ Get File Progress
**GET** `/api/files/:fileId/progress`

**Response Example (Processing):**
```json
{
  "fileId": "uuid-generated-fileid",
  "status": "processing",
  "progress": 60
}
```

**Response Example (Ready):**
```json
{
  "fileId": "uuid-generated-fileid",
  "status": "ready",
  "progress": 100
}
```

### 3️⃣ Get Parsed File Content
**GET** `/api/files/:fileId`

**Response Example (Processing):**
```json
{
  "message": "File upload or processing in progress. Please try again later."
}
```

**Response Example (Parsed Data Ready):**
```json
{
  "fileId": "uuid-generated-fileid",
  "parsedData": [
    { "name": "John", "age": 25 },
    { "name": "Alice", "age": 30 }
  ]
}
```

### 4️⃣ List All Files
**GET** `/api/files`

**Response Example:**
```json
[
  {
    "fileId": "uuid-1",
    "filename": "sample1.csv",
    "status": "ready",
    "progress": 100,
    "createdAt": "2025-08-20T14:51:12.000Z"
  },
  {
    "fileId": "uuid-2",
    "filename": "sample2.json",
    "status": "processing",
    "progress": 40,
    "createdAt": "2025-08-20T15:05:42.000Z"
  }
]
```

### 5️⃣ Delete a File
**DELETE** `/api/files/:fileId`

**Response Example (Success):**
```json
{
  "message": "File deleted successfully"
}
```

**Response Example (Not Found):**
```json
{
  "message": "File not found"
}
```

---

## 📝 Notes
- File uploads are asynchronous; check progress using `/api/files/:fileId/progress`
- Supports CSV, JSON, TXT formats
- Uploaded files are saved in the `uploads/` folder
- Test APIs using Postman or Thunder Client with form-data

---

## 👤 Author
**Jammalamadugu Shaik Nafeez**  
BTech CSE, MERN/Fullstack Developer