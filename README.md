# NewsPulse

Welcome to NewsPulse, a dynamic news portal that provides users with the latest articles from various categories and allows for searching specific news topics.

## Features

- Browse news articles by category (e.g., Business, Technology, Sports).
- Search for articles using keywords.
- View detailed information about each article.
- Responsive design for a seamless user experience.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **API:** NewsAPI.org for fetching news articles

## Getting Started

### Prerequisites

- Node.js (v14 or higher)

### Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd NewsPulse
   ```

2. **Backend Setup:**

   - Navigate to the `backend` directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file and add your MongoDB URI and News API key:
     ```plaintext
     MONGODB_URI=<your_mongodb_uri>
     NEWS_API_KEY=<your_news_api_key>
     ```
   - Start the backend server:
     ```bash
     node server.js
     ```

3. **Frontend Setup:**

   - Navigate to the `frontend` directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```

4. **Access the Application:**
   - Open your browser and go to `http://localhost:5173` to view the application.
