# AWS Access Portal – Frontend

This repository contains the frontend application for an AWS Access Request Platform.
The platform allows users to request temporary AWS permissions and track approval status.

The frontend is designed to work with a Spring Boot backend integrated with an LLM for request validation and IAM policy generation.

---

## Project Overview

The system enables users to:
- Submit AWS access requests using natural language
- Select AWS services and actions
- Track request lifecycle through approval stages
- View request details from a dashboard

The frontend is built in phases to ensure stability and clear separation from backend logic.

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- React
- CSS (no Tailwind)
- shadcn/ui components
- Node.js

---

## Implemented Features

### Access Request Form
- AWS service selection (S3, EC2, IAM, DynamoDB)
- Conditional action selection for S3
- Fixed access duration (24 hours)
- Natural language input for use case description

### Dashboard
- Tabular view of access requests
- Status indicators:
  - CREATED
  - DEVOPS_APPROVED
  - MANAGER_APPROVED
  - MANAGER_REJECTED
- Loading and empty state handling
- Navigation to individual request details

### Request Details Page
- Dedicated page for each access request
- Displays service, action, reason, duration, status, and timestamps
- URL-based routing using request ID

Note: Dashboard data is currently mocked. Backend GET API integration is planned in the next phase.

---

## Backend Integration Status

| Feature                     | Status        |
|----------------------------|---------------|
| Create Access Request (POST) | Integrated    |
| Database Persistence        | Working       |
| LLM Processing              | Backend       |
| Fetch Requests (GET)        | Planned       |
| Approval Actions            | Planned       |

---

## Running the Project Locally

```bash
npm install
npm run dev
