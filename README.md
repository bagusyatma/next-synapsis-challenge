# BLOGNarsys

A blog application built with Next.js, featuring dark mode, authentication, and CRUD operations. This application uses the GoRest API for data management.

## 🚀 Live Demo

Check out the live application: [BLOGNarsys](https://next-synapsis-challenge.vercel.app/)

## 🚀 Features

- ✨ UI with Ant Design
- 🌓 Dark/Light mode support
- 🔐 Token-based authentication
- 📝 CRUD operations for blog posts
- 📱 Responsive design

## 🛠️ Tech Stack

- Next.js 13
- Ant Design 5
- Tailwind CSS
- React Query
- Axios
- JS-Cookie

## 🚦 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/bagusyatma/next-synapsis-challenge.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔑 Authentication

To use this application, you'll need a GoRest API token:

1. Visit [GoRest](https://gorest.co.in/)
2. Generate your access token
3. Use the token when logging into the application

## 📁 Project Structure

src/

├── common/ # Common utilities and constants
├── components/ # Reusable components
├── context/ # Context providers
├── pages/ # Main pages
|-- styles/ # Global styles
|-- theme/ # Theme configuration
|-- utils/ # Utility functions

## 🔧 Environment Variables

No environment variables are required as the application uses client-side token storage.

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
