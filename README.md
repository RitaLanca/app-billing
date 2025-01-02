# React Application with Mocked API

This project is a React application using `json-server` to provide a mocked API for development.

## Features
- Dashboard with analytics.
- Checklist with compliance requirements.
- Invoice simulation
- Notification system whenever a requirement deadline is near to close
- Application containerized with Docker.

## Prerequisites
- [Node.js](https://nodejs.org/)
- npm or yarn
- [Docker](https://www.docker.com/)

## Technologies
- React js
- JSON server
- Docker and Docker compose

## Installation and Usage

### Locally

1. Clone the Repository
```bash
git clone https://github.com/RitaLanca/app-billing.git
cd app-billing
```

2. Install dependencies
```bash
npm install
```

3. Init JSON server
```bash
npm run start-dev-server
# or
npx json-server --watch db.json --port 8000
```

4. Init react app
```bash
npm run dev
```
5. The application will run on http://localhost:5173


### Using Docker Compose
Start the services:
```bash
docker-compose up
```
