# B7A2

# 🚼 DevPulse
## Live URL: https://b7-a2-tan.vercel.app


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

### users

| Field      | Type         |
|------------|--------------|
| id         | SERIAL       |
| name       | VARCHAR(100) |
| email      | VARCHAR(100) |
| password   | TEXT         |
| role       | VARCHAR(20)  |
| created_at | TIMESTAMP    |

### issues

| Field        | Type         |
|--------------|--------------|
| id           | SERIAL       |
| title        | VARCHAR(255) |
| description  | TEXT         |
| type         | VARCHAR(50)  |
| status       | VARCHAR(50)  |
| reporter_id  | INTEGER      |
| assignee_id  | INTEGER      |
| created_at   | TIMESTAMP    |

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