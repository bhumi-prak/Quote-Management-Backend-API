# Quote Management Backend API

## Overview

This project is a backend service built using Node.js, TypeScript, Express.js, Prisma ORM, and SQLite.

The application manages quote requests, integrates with an AI analysis service (FastAPI), stores analysis results, and provides APIs for managing quote status and data.

---

## Features

* Create quote requests
* Retrieve all quotes
* Retrieve quote details with analysis result
* Analyze quotes using FastAPI integration
* Update quote status
* Request validation
* Error handling
* Search quotes
* Pagination support

---

## Tech Stack

* Node.js
* TypeScript
* Express.js
* Prisma ORM
* SQLite Database
* Axios (FastAPI communication)
* Zod (Validation)
* Postman (API Testing)

---

## Project Structure

```
src
│
├── controllers
│      quote.controller.ts
│
├── routes
│      quote.routes.ts
│
├── services
│      quote.service.ts
│      analysis.service.ts
│
├── repositories
│      quote.repository.ts
│
├── middleware
│      error.middleware.ts
│
├── utils
│      prisma.ts
│
├── app.ts
└── server.ts
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd quote-management-backend
```

Install dependencies:

```bash
npm install
```

---

## Environment Setup

Create a `.env` file:

```env
DATABASE_URL="file:./dev.db"
```

---

## Database Setup

Generate Prisma client:

```bash
npx prisma generate
```

Run database migration:

```bash
npx prisma migrate dev
```

---

# Running the Project

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* SQLite
* Git

## Install Dependencies

```bash
npm install
```

## Setup Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
```

## Setup Database

Generate Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

## Start Development Server

Run:

```bash
npm run dev
```

Server starts at:

```bash
http://localhost:3000
```

## Build Project

To create production build:

```bash
npm run build
```

## Start Production Server

```bash
npm run start
```


---

# API Endpoints

## Create Quote

**POST**

```
/quotes
```

Request:

```json
{
  "customer": "ABC Corporation",
  "project": "Bridge Construction",
  "estimated_value": 500000
}
```

---

## Get All Quotes

**GET**

```
/quotes
```

---

## Get Quote By ID

**GET**

```
/quotes/:id
```

Returns quote details with analysis result.

---

## Analyze Quote

**POST**

```
/quotes/:id/analyze
```

Process:

1. Find quote
2. Call FastAPI analysis service
3. Store analysis result
4. Return combined response

Example response:

```json
{
  "risk": "Medium",
  "confidence": 91,
  "missing_items": [
    "Structural drawings",
    "Load requirements"
  ]
}
```

---

## Update Quote Status

**PATCH**

```
/quotes/:id/status
```

Allowed values:

```
New
In Review
Needs Info
Completed
```

Example:

```json
{
  "status": "Completed"
}
```

---

# Bonus Features

## Search

Search quotes by customer or project.

Example:

```
GET /quotes/search?search=ABC
```

---

## Pagination

Fetch quotes page by page.

Example:

```
GET /quotes?page=1&limit=5
```

---

# Validation

The API validates:

* Missing customer
* Missing project
* Negative estimated value
* Invalid status values

Invalid requests return meaningful error messages.

---

# Error Handling

The application handles:

* Quote not found
* Invalid requests
* Database errors
* Analysis service failures

---

# API Testing

Import the Postman collection:

```
Quote Management API.postman_collection.json
```

The collection contains all available APIs with request examples.

---

# Database Models

## QuoteRequest

Stores quote information:

* id
* customer
* project
* status
* estimated_value
* created_date

## AnalysisResult

Stores AI analysis information:

* quote_id
* risk
* confidence
* missing_items
* analyzed_at

---

# Future Improvements

* Add authentication and authorization
* Add automated unit tests
* Add Docker support
* Add background processing for long-running AI analysis
* Add API documentation using Swagger
