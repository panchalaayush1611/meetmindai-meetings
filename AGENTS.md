# AGENTS.md

# MeetMind AI — Project Context

## Project Overview

MeetMind AI is an enterprise-grade AI Meeting Intelligence Platform built using the MERN Stack.

This project is **NOT** a Zoom, Google Meet, or Microsoft Teams clone.

It does **NOT** provide video conferencing.

Instead, MeetMind AI sits on top of existing meeting platforms and transforms meeting recordings into structured business intelligence.

The objective is to convert unstructured meeting conversations into searchable organizational knowledge, automatically generated tasks, decisions, deadlines, risks, analytics, and productivity insights.

This project is intended to demonstrate production-level software engineering practices rather than being a simple college CRUD application.

---

# Product Vision

Companies spend several hours every day in meetings.

Although meetings generate valuable business knowledge, most organizations lose that information because:

* Decisions are forgotten.
* Tasks are not assigned properly.
* Deadlines disappear.
* Managers repeatedly ask for updates.
* New employees cannot understand previous discussions.
* Meeting recordings are rarely watched again.
* Long transcripts are difficult to search.

MeetMind AI solves this by converting meetings into structured knowledge that remains accessible forever.

The long-term goal is to become the organizational memory of every company.

---

# Existing Market

Current competitors include:

* Microsoft Teams + Copilot
* Zoom AI Companion
* Google Meet + Gemini
* Fireflies AI
* Otter.ai
* Fathom

Most competitors generate:

* Meeting recordings
* Transcripts
* AI summaries

MeetMind AI goes further by generating actionable business intelligence.

---

# Core Value Proposition

Instead of asking

"What happened in today's meeting?"

Users should be able to ask

"When was the payment gateway approved?"

"What decisions were made about authentication?"

"What tasks are assigned to Rahul?"

The application should instantly answer those questions.

---

# Target Users

Primary Users

* Software Companies
* Product Teams
* Startups
* Corporate Organizations
* Consulting Companies

Secondary Users

* HR Teams
* Marketing Teams
* Sales Teams
* Educational Institutions

---

# User Roles

## Admin

Responsibilities

* Manage workspace
* Manage users
* View analytics
* Configure AI settings

---

## Manager

Responsibilities

* Upload meetings
* Review summaries
* Assign tasks
* Monitor team productivity

---

## Employee

Responsibilities

* View meetings
* Search previous meetings
* Complete assigned tasks
* Collaborate with teammates

---

# Core Features

Authentication

Dashboard

Meeting Upload

Transcript Viewer

AI Summary

Action Item Extraction

Deadline Detection

Owner Detection

Risk Detection

Meeting Health Score

Task Management

Workspace Management

Analytics Dashboard

Notifications

AI Search

AI Assistant

Settings

---

# Product Workflow

Meeting Recording

↓

Upload

↓

Speech-to-Text

↓

Transcript

↓

Gemini AI Analysis

↓

Structured JSON

↓

MongoDB

↓

Dashboard

↓

Tasks

↓

Analytics

↓

Search

↓

Company Knowledge Base

---

# AI Processing Pipeline

Every uploaded meeting follows this workflow.

1. User uploads audio/video.

2. Backend sends recording to Whisper.cpp.

3. Whisper.cpp generates transcript.

4. Backend sends transcript to Gemini.

5. Gemini returns structured JSON.

Example JSON

{
summary,

decisions[],

actionItems[],

owners[],

deadlines[],

risks[],

keywords[]

}

6. Backend stores JSON inside MongoDB.

7. Frontend displays processed information.

Gemini should only be called once per uploaded meeting.

Subsequent requests should use MongoDB instead of making additional AI requests whenever possible.

---

# Technology Stack

Frontend

React

React Router

Tailwind CSS

Redux Toolkit

Axios

React Hook Form

Framer Motion

React Icons

Recharts

Backend

Node.js

Express.js

JWT Authentication

Socket.io

Multer

Database

MongoDB Atlas (Free Tier)

Mongoose

Artificial Intelligence

Whisper.cpp (Speech-to-Text)

Google Gemini API (Free Tier)

Storage

Cloudinary (Free Tier)

Deployment

Frontend

Vercel

Backend

Render

Database

MongoDB Atlas

Storage

Cloudinary

Version Control

GitHub

Only free or open-source technologies should be used unless explicitly approved.

---

# Folder Structure

client/

server/

docs/

assets/

README.md

AGENTS.md

The frontend and backend should remain independent projects.

---

# Architecture

React

↓

Express API

↓

MongoDB

↓

Gemini

↓

Whisper.cpp

↓

Cloudinary

The frontend must never communicate directly with Gemini.

All AI requests go through the backend.

---

# Development Philosophy

This project should be developed incrementally.

Version 1 (MVP)

* Authentication
* Dashboard
* Meeting Upload
* Transcript Viewer
* AI Summary

Version 2

* Tasks
* Analytics
* Notifications
* Workspace

Version 3

* AI Search
* Team Collaboration
* Real-time Updates

Version 4

* Integrations
* Enterprise Features

---

# Coding Standards

Always write production-quality code.

Avoid quick hacks.

Prefer reusable components.

Use functional React components.

Use Hooks.

Avoid duplicate code.

Follow feature-based organization whenever possible.

Write meaningful variable names.

Keep files small and maintainable.

---

# Frontend Rules

Use Tailwind CSS only.

Do not introduce Bootstrap.

Do not use inline CSS.

Maintain the existing design system.

Keep the UI enterprise-focused.

Use responsive layouts.

Reuse components whenever possible.

Avoid unnecessary libraries.

---

# Backend Rules

Follow REST API conventions.

Separate controllers, services, routes, and models.

Validate every request.

Never trust client input.

Keep business logic out of routes.

Return consistent API responses.

---

# Database Rules

Use MongoDB with Mongoose.

Collections should include:

Users

Workspaces

Meetings

Tasks

Notifications

Comments

Analytics

Activity Logs

Every document should include timestamps.

Meetings, tasks, and users must always belong to a workspace.

Workspace isolation is mandatory.

---

# Security Requirements

Implement:

JWT Authentication

bcrypt Password Hashing

Helmet

CORS

Rate Limiting

Input Validation

Role-Based Access Control

Workspace Isolation

Environment Variables

Audit Logging

Prompt Injection Protection

Never expose secrets to the frontend.

Never store plain-text passwords.

---

# AI Rules

Gemini is used only for reasoning.

Gemini should return structured JSON instead of paragraphs whenever possible.

Do not call Gemini unnecessarily.

Cache AI results in MongoDB.

Prompt engineering should prioritize structured outputs.

Whisper.cpp is responsible only for transcription.

---

# Deployment Rules

Frontend

Vercel

Backend

Render

Database

MongoDB Atlas

Storage

Cloudinary

No paid infrastructure should be required for development or demonstration.

---

# Things NOT to Do

Do not redesign the application's architecture without approval.

Do not replace the MERN stack.

Do not introduce paid APIs.

Do not break existing UI.

Do not remove reusable components.

Do not hardcode data that should come from APIs.

Do not mix frontend business logic with backend business logic.

---

# Long-Term Vision

MeetMind AI is intended to evolve into an enterprise AI Meeting Intelligence Platform.

The objective is to transform every meeting into searchable organizational knowledge rather than simply generating transcripts.

Every meeting should automatically become:

* Documentation
* Decisions
* Action Items
* Deadlines
* Analytics
* Organizational Memory

The project should demonstrate production-level software engineering, scalable architecture, AI integration, clean code, and enterprise development practices suitable for internships, placements, hackathons, and future startup opportunities.
