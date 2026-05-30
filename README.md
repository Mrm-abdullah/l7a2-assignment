# B7A2

# 🚼 DevPulse
## Live URL: https://issue-tracker-api.onrender.com


> Internal Tech Issue & Feature Tracker
> 
> 
> *A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions.*
> 

---

## 🛠️ Technology Stack

| Technology |
| --- | 
| Node.js | 
| TypeScript |
| Express.js |
| PostgreSQL |
| Raw SQL |
| bcrypt | 
| jsonwebtoken |

---

## 👥 User Roles & Permissions

| Role | Allowed Actions |
| --- | --- |
| **contributor** | • Register and log in<br>• Create new issues (bug or feature request)<br>• View all issues<br>• Update own issue field |
| **maintainer** | • All contributor permissions<br>• Update any issue field<br>• Delete any issue<br>• Change issue workflow status independently<br>|

---

## 🗄️ Database Schema Design

### Table 1: `users`

| Field | Requirement (Plain Text) |
| --- | --- |
| `id` | Auto-incrementing unique identifier for each account |
| `name` | Full display name of the team member, must be provided |
| `email` | Valid login address, must be unique across all accounts, must be provided |
| `password` | Encrypted string stored securely, must be provided during registration, never returned in responses |
| `role` | Determines system access level, defaults to `contributor`, must be `contributor` or `maintainer` |
| `created_at` | Timestamp marking when the account was created, automatically generated on insert |
| `updated_at` | Timestamp marking when the account was last updated, automatically refreshed on update |

### Table 2: `issues`

| Field | Requirement (Plain Text) |
| --- | --- |
| `id` | Auto-incrementing unique identifier for each reported item |
| `title` | Short descriptive headline, must be provided, maximum 150 characters |
| `description` | Detailed explanation of the problem or suggestion, must be provided, minimum 20 characters |
| `type` | Categorizes the entry, must be either `bug` or `feature_request` |
| `status` | Current workflow state, defaults to `open`. Status must be one of: `open`, `in_progress`, `resolved` |
| `reporter_id` | References the user who submitted the issue (no foreign key constraint required; validate in application logic) |
| `created_at` | Timestamp marking when the issue was created, automatically generated on insert |
| `updated_at` | Timestamp marking when the issue was last updated, automatically refreshed on update |

---

## 🌐 API Endpoints Specification

### 🔹 Authentication Module

### 1. User Registration

**Access:** Public

**Description:** Register a new user account with contributor or maintainer role

**Endpoint**

`POST /api/auth/signup`

### 2. User Login

**Access:** Public

**Description:** Authenticate user and receive JWT token

**Endpoint**

`POST /api/auth/login`

### 🔹 Issues Module

### 3. Create Issue

**Access:** Authenticated users (`contributor`, `maintainer`)

**Description:** Create a new bug report or feature request

**Endpoint**

`POST /api/issues`

### 4. Get All Issues

**Access:** Public

**Description:** Retrieve all issues with optional sorting and filtering

**Endpoint**

`GET /api/issues`

### 5. Get Single Issue

**Access:** Public

**Description:** Retrieve full details of a specific issue

**Endpoint**

`GET /api/issues/:id`

### 6. Update Issue

**Access:** Maintainer (any issue) OR Contributor (own issue, only if status is `open`)

**Description:** Update issue title, description, or type

**Endpoint**

`PATCH /api/issues/:id`

### 7. Delete Issue

**Access:** Maintainer only

**Description:** Permanently remove an issue from the system

**Endpoint**

`DELETE /api/issues/:id`

---

## Setup Instructions

1. Clone the repository

git clone https://github.com/Mrm-abdullah/l7a2-assignment

2. Install dependencies

npm install

3. Create .env file

PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
JWT_REFRESH_SECRET=your_JWT_REFRESH_SECRET

4. Start development server

npm run dev



do it
## 🎤 Technical Interview Video (Answer Any 2)

**Questions:**

1. How does the Node.js event loop execute asynchronous tasks without blocking the single main thread?
2. What is the purpose of `next()` in Express middleware, and what happens if it is omitted in a route handler?
3. How do you create a centralized error-handling middleware in Express to safely catch both sync and async errors?
4. What are the main differences between SQL (PostgreSQL) and NoSQL (MongoDB) regarding schema design and scaling?
5. What is database connection pooling in PostgreSQL, and why is it preferred over opening a new client connection for every request?

**🎤 Recording Instructions:**

- Use your smartphone selfie camera or laptop webcam in **landscape (horizontal) mode**.
- Record in a **well-lit, quiet room** with your **face fully visible** throughout the video.
- Select and answer **any 2 questions** from the list above, spoken in **English**.
- Keep each answer between **3–5 minutes**. Speak naturally from your understanding — avoid reading verbatim from notes or scripts.
- Upload your video to **Google Drive**, **YouTube (Unlisted)**, or any cloud platform, and share a **publicly accessible link**.

---

### 2️⃣ Deployment Requirements

- Deploy backend to **Vercel**, **Render**, or **Railway**
- Use **NeonDB**, **Supabase**, or **ElephantSQL** for PostgreSQL
- Ensure CORS and environment variables are properly configured

[**README.md](http://readme.md/) must include:**

- Project name, live URL, features, tech stack
- Setup steps, API endpoint list, database schema summary
- Keep it clear and professional

---

---

### 3️⃣ Final Submission Checklist

Submit the following in your assignment form:

```
✅ GitHub Repo (Public):      <https://github.com/yourusername/devpulse>
✅ Live Deployment (Public):  <https://devpulse-api.vercel.app>
✅ Interview Video (Public):  <https://drive.google.com/>... or <https://youtu.be/>...
```

> 💡 **Pro Tips:**
> 
> - Ensure your GitHub repo has **at least 10 meaningful commits** showing progressive development
> - Avoid single-commit submissions
> - Double-check all links are publicly accessible before submitting

