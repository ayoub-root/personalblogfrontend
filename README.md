# Project Name: My Portfolio and Blog Application

Welcome to My Portfolio and Blog Application! This project is a feature-rich web application built using Next.js. It includes a blog, a portfolio section, and a dashboard to manage different portfolios (CVs). The application also features a contact page to receive messages, user authentication (login, register, and password reset), and more.

(this readme should be updated)
## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Contact](#contact)

## Features
- **Blog**: Create, read, update, and delete blog posts.
- **Portfolio**: Showcase different portfolios (CVs) with the ability to manage them through a dashboard.
- **Dashboard**: Manage your blog posts and portfolios.
- **Contact Us**: Receive messages from visitors.
- **User Authentication**: Register, login, and reset password functionality.

## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js (>= 14.x)
- npm or yarn
- Git (optional but recommended)

## Installation
To install the application, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```

2. Navigate to the project directory:
    ```bash
    cd your-repo-name
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```
   or
    ```bash
    yarn install
    ```

## Setup
1. Create a `.env.local` file in the root directory of the project:
    ```bash
    touch .env.local
    ```

2. Add the necessary environment variables to the `.env.local` file:
    ```
    NEXT_PUBLIC_API_URL=http://your-api-url.com
    NEXT_PUBLIC_SITE_NAME=My Portfolio and Blog
    ```

3. Set up any necessary API keys or secret configurations in the `.env.local` file.

## Running the Application
To run the application, use the following commands:

1. **Development mode**:
    ```bash
    npm run dev
    ```
   or
    ```bash
    yarn dev
    ```

2. **Production mode**:
   Build the application:
    ```bash
    npm run build
    ```
   or
    ```bash
    yarn build
    ```

   Start the application:
    ```bash
    npm start
    ```
   or
    ```bash
    yarn start
    ```

## Project Structure
The project structure is as follows:
```
your-repo-name/
├── components/         # Reusable components
├── pages/              # Next.js pages
│   ├── api/            # API routes
│   ├── blog/           # Blog-related pages
│   ├── dashboard/      # Dashboard-related pages
│   ├── portfolio/      # Portfolio-related pages
│   ├── auth/           # Authentication-related pages
│   ├── index.js        # Home page
│   └── _app.js         # Custom App component
├── public/             # Public assets
├── styles/             # CSS and Sass files
├── .env.local          # Environment variables
├── next.config.js      # Next.js configuration
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

## Contact
If you have any questions or need further assistance, please feel free to contact me at [ayoub.inf30@gmail.com].

Thank you for using My Portfolio and Blog Application!