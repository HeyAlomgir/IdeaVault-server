# IdeaVault – Startup Idea Sharing Platform (Backend Server)

This is the server-side REST API for **IdeaVault**, built with Node.js, Express, and MongoDB. It handles user authentication validation, JWT token issuance, secure database management (CRUD), and search/filter query executions.

👉 **Live Server API URL:** [https://onrender.com](https://onrender.com) *(Replace with your actual Render/Heroku deployment link)*

---

## ✨ Core Features & Server Logic

- **JWT Authentication Routing:** Secures protected endpoints by verifying JSON Web Tokens sent from the Next.js client. 
- **Robust Idea CRUD API:** Structured endpoints to handle adding new ideas, fetching top trending ideas using `$limit`, updating specific user submissions, and processing deletions.
- **Dynamic Search & Regex Filter Engine:** Implements database querying using MongoDB `$regex` for case-insensitive title tracking. Features category-based conditional filters.
- **Full Comment Thread Architecture:** Supports a complete nested database structure allowing users to create, update, and remove comments dynamically based on their matching User ID.
- **Activity Interaction Tracking:** Specialized aggregations to pull user specific logs (e.g., items commented on) to feed the client-side interaction log dashboard.

---

## 🛠️ Tech Stack

- **Runtime Environment:** Node.js
- **Backend Framework:** Express.js
- **Database Engine:** MongoDB (via official Driver or Mongoose)
- **Security & Utilities:** JSON Web Tokens (JWT), Cors, Dotenv

---


## ⚙️ Local Installation & Setup

Follow these steps to spin up the backend environment locally:

### 1. Clone the Server Repository
```bash
git clone <your-server-side-github-repo-url>
cd ideavault-server
```

### 2. Install Server Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory of your backend application and configure the following parameters:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ideavault
JWT_SECRET=your_super_secure_jwt_secret_key
CLIENT_URL=http://localhost:3000
```

### 4. Run the Server
To launch the application in development mode with continuous auto-restarts:
```bash
npm run dev
# Or if you use standard node execution:
npm start
```
The server will boot up and listen for API requests at `http://localhost:5000`.

---
Developed with ❤️ for IdeaVault API.
