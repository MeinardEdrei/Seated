# 🪑 Seated
A platform designed to serve as **UMak’s official seat reservation system**.  

---

## 🐳 Running the Project with Docker

This project uses **Docker** and **Docker Compose** to simplify setup and ensure every team member runs the same environment.

---

## ⚙️ Prerequisites
Make sure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)  

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone git@github.com:MeinardEdrei/Seated.git
```

### 2. Set Up Environment Variables
Create a .env file inside the docker/ directory (if not already provided):
```bash
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=seated_db
MYSQL_USER=seated_user
MYSQL_PASSWORD=your_password
MYSQL_PORT=3306
```

### 3. Start the Containers
From the project root (Seated/), run:
```bash
docker compose -f docker/docker-compose.yml up -d
```
This will start:
* 🗄️ MySQL (database)
* ⚙️ Backend API (ASP.NET Core)
* 🧭 phpMyAdmin (database management UI)

### 4. Stop the Containers
To stop and remove all running containers:
```bash
docker compose -f docker/docker-compose.yml down
```

### 5. Access the Services
* Backend API: http://localhost:5165/weatherforecast
* phpMyAdmin: http://localhost:8080

## 🧠 Notes
Database data is persistent across restarts because it’s stored in a Docker volume (mysql_data).

You can check running containers with:
```bash
docker ps
```

Logs can be viewed with:
```bash
docker compose -f docker/docker-compose.yml logs -f
```
