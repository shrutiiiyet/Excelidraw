# 🖌️ Excelidraw – Real-Time Collaborative Canvas

Excelidraw is a real-time collaborative canvas application inspired by Excalidraw. Users can join shared rooms and draw shapes or text together in real time.

---

## 🔧 Features & Tech Stack

- 🧠 Built with a **Turborepo monorepo** architecture using **TypeScript** throughout
- 🔌 Real-time collaboration powered by **WebSockets**
- 🗂️ Room-based multi-user drawing experience using **slug-based routing**
- 🧱 **Backend:** Node.js, Express.js, WebSockets, PostgreSQL, Prisma ORM
- 🎨 **Frontend:** Next.js, React, Zustand, Tailwind CSS
- 🛠️ **Database & Schema:** PostgreSQL with Prisma migrations
- 🚀 **Deployment:** Planned via Docker & CI/CD pipeline

---

## 🛠️ Project Status

- ✅ **Backend completed** with persistent collaboration and room syncing
- 🔧 **Frontend completed**
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
- [x] Frontend layout and routing
- [ ] Full containerization and orchestration 
- [ ] Deployment with CI/CD (coming soon)

---

## 🤝 Contributing

With the frontend now complete, contributions are officially open!

We welcome developers to help refine existing features, improve performance, and expand functionality. Whether you’re fixing a bug, optimizing rendering, or enhancing collaboration tools — your contribution matters.

### 🧭 How to Contribute

1. Fork the repository
   
2. Clone the repository

```git clone https://github.com/shrutiiiyet/Excelidraw```

4. Create a branch for your feature or fix

```git checkout -b feature/your-feature-name```


4. Commit your changes with clear messages

5. Push to your forked repository

6. Submit a Pull Request describing your improvements

## 💡 You Can Contribute By:

- Enhancing performance or state management with Zustand

- Refining the collaborative drawing logic

- Improving UI/UX for the canvas tools

- Writing tests or improving documentation

- Setting up deployment and CI/CD pipelines

---

## 📣 Stay Tuned

The complete Excelidraw app will be available online soon.  
Feel free to star 🌟 the repo and follow updates!

---

# 📜 License

This project is licensed under the MIT License.
Feel free to use, modify, and share responsibly.
