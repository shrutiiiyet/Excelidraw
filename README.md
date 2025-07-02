# 🖌️ Excelidraw – Real-Time Collaborative Canvas

Excelidraw is a real-time collaborative canvas application inspired by Excalidraw. Users can join shared rooms and draw shapes or text together in real time.

---

## 🔧 Features & Tech Stack

- 🧠 Built with a **Turborepo monorepo** architecture using **TypeScript** throughout
- 🔌 Real-time collaboration powered by **WebSockets**
- 🗂️ Room-based multi-user drawing experience using **slug-based routing**
- 🧱 **Backend:** Node.js, Express.js, WebSockets, PostgreSQL, Prisma ORM
- 🎨 **Frontend (in progress):** Next.js, React, Zustand, Tailwind CSS
- 🛠️ **Database & Schema:** PostgreSQL with Prisma migrations
- 🚀 **Deployment:** Planned via Docker & CI/CD pipeline

---

## 🛠️ Project Status

- ✅ **Backend completed** with persistent collaboration and room syncing
- 🔧 **Frontend under active development**
- 🌐 **Live deployment coming soon**

---

## 📂 Project Structure

- excelidraw/
- │
- ├── apps/
- │ ├── excelidraw-backend # Fully working backend API
- │ └── excelidraw-frontend # Frontend (in progress, currently ignored)
- │
- ├── packages/
- │    ├── backend-common # Common files used amongst backaneds
- │    ├── common # Common Schema
- └─── db #Prisma schema and migrations


## 📌 To Do

- [x] Real-time collaboration backend
- [x] Canvas rendering & drawing tools
- [ ] Frontend layout and routing
- [ ] Deployment with CI/CD (coming soon)

---

## 📣 Stay Tuned

The complete Excelidraw app will be available online soon.  
Feel free to star 🌟 the repo and follow updates!

---

## 🤝 Contributing

This project is currently in early development. Once frontend stabilizes, contributions will be welcome!

---

## 📜 License

MIT License