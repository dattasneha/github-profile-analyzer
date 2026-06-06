# GitHub Profile Analyzer API

## Overview

GitHub Profile Analyzer API is a backend application built with Node.js, Express.js, and MySQL. The application fetches public GitHub user data using the GitHub API, analyzes useful profile insights, and stores them in a MySQL database.

## Features

* Fetch GitHub user profile information using a GitHub username
* Analyze and store profile insights
* Store analyzed data in MySQL
* Retrieve all analyzed profiles
* Retrieve a single analyzed profile by username
* Automatic update of existing profiles using MySQL UPSERT logic

## Tech Stack

* Node.js
* Express.js
* MySQL
* GitHub REST API
* Railway (MySQL Hosting)
* Render (Deployment)


## Database Schema

```sql
CREATE TABLE github_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    public_repos INT DEFAULT 0,
    followers INT DEFAULT 0,
    following INT DEFAULT 0,
    public_gists INT DEFAULT 0,
    account_age_days INT DEFAULT 0,
    profile_url VARCHAR(500),
    avatar_url VARCHAR(500),
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Installation

### Clone Repository

```bash
git clone https://github.com/dattasneha/github-profile-analyzer.git
cd github-profile-analyzer
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000

DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name

GITHUB_TOKEN=your_github_personal_access_token
```

### Run Application

```bash
npm start
```

or

```bash
node app.js
```

Server will start on:

```text
http://localhost:3000
```

## API Endpoints

### Analyze GitHub Profile

Fetches data from GitHub API, analyzes it, and stores it in MySQL.

```http
GET /api/github/analyze/:username
```

Example:

```http
GET /api/github/analyze/mojombo
```

### Get All Analyzed Profiles

```http
GET /api/github/profiles
```

### Get Single Profile

```http
GET /api/github/profiles/:username
```

Example:

```http
GET /api/github/profiles/mojombo
```

## Sample Insights Stored

* Username
* Name
* Public Repository Count
* Followers Count
* Following Count
* Public Gists Count
* Account Age (Days)
* GitHub Profile URL
* Avatar URL
* Analysis Timestamp

## Live Deployment

Render URL:

```text
https://github-profile-analyzer-v48x.onrender.com
```

## Testing

The API can be tested using:

* Browser
* Postman
* Thunder Client (VS Code)

Example Endpoints:

```text
https://github-profile-analyzer-v48x.onrender.com/api/github/analyze/mojombo

https://github-profile-analyzer-v48x.onrender.com/api/github/profiles

https://github-profile-analyzer-v48x.onrender.com/api/github/profiles/mojombo
```


