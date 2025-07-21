# API Management System

## Overview
A full-stack API management platform that centralizes API control, monitoring, security, and documentation. It includes an API gateway, per-API rate limiting, analytics, and user authentication.

## Features
- **API Gateway:** Proxy endpoint for each API, centralizing requests and enforcing limits.
- **Rate Limiting:** Set hourly usage limits per API.
- **Monitoring & Analytics:** View usage stats and graphs for each API.
- **Security:** JWT-based authentication for all requests.
- **Documentation:** Add and edit documentation for each API.
- **Frontend:** React-based dashboard for managing APIs, viewing analytics, and copying proxy endpoints.

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB (local or cloud)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/api_manage.git
   ```
2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

### Running Locally
1. Start MongoDB.
2. Start the backend server:
   ```
   cd backend
   npm start
   ```
3. Start the frontend:
   ```
   cd ../frontend
   npm run dev
   ```
4. Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- **Add API:** Use the dashboard to add a new API. Set endpoint, method, and hourly limit.
- **Proxy Endpoint:** Use the provided proxy URL to route requests through the gateway.
- **Analytics:** View usage stats and graphs for each API.
- **Documentation:** Add/edit documentation for each API.
- **Authentication:** Log in to access and manage APIs.

## Technologies Used
- **Frontend:** React, Axios
- **Backend:** Express, MongoDB, Mongoose, JWT, Axios (for proxy)
- **Analytics:** Chart.js or Recharts (for graphs)

## License