# 📚 AI Study Assistant

An AI-powered full-stack web application that transforms study notes into concise summaries, interactive flashcards, and interactive quizzes using Google Gemini AI. Users can paste study notes or upload PDF lecture notes to instantly generate AI-powered learning material. The application provides an engaging and interactive way to study while handling unreliable AI responses gracefully.

---

# 🚀 Live Demo

**Frontend:** https://ai-study-assistant-five-rouge.vercel.app

**Backend API:** https://ai-study-assistant-8ogw.onrender.com

---

# ✨ Features

- 🤖 AI-generated study summaries
- 🧠 AI-generated flashcards
- 📝 Interactive multiple-choice quizzes
- 📄 Upload lecture notes as PDF
- 📥 Download generated study kit as PDF
- 📋 Copy study kit to clipboard
- 🕘 Study history with search functionality
- 🗑️ Delete study history
- 💾 Local storage persistence
- ⏳ Loading spinner
- 🔔 Toast notifications
- 🔄 Retry logic for failed AI requests
- ❌ Robust AI response validation and error handling
- 📱 Responsive design for desktop and mobile devices

---

# 🎯 Usage

1. Enter a study topic or paste your study notes into the text area.
2. (Optional) Upload a PDF containing lecture notes.
3. Click **Generate Study Kit**.
4. Review the AI-generated summary.
5. Flip the flashcards to test your knowledge.
6. Take the interactive quiz and view your score.
7. Copy or download the generated study kit.
8. Access previous study sessions from the history panel.

---

# 🤖 AI Usage

This project was developed with assistance from AI tools (ChatGPT) for brainstorming ideas, debugging, reviewing code, improving error handling, and refining the application. All application logic, customization, integration, testing, deployment, and final implementation were completed and verified by the author.

---

# 🔒 API Security

The Google Gemini API key is **never exposed in the browser**.

All AI requests are securely routed through an Express.js backend using environment variables (`.env`). This protects the API key while allowing the frontend to communicate safely with the AI model.

---

# ⚠️ Known Limitations

- AI responses depend on the quality of the input provided by the user.
- Very large PDF files may require additional processing time.
- Occasionally the AI may return malformed JSON, which is handled using validation, retry logic, and user-friendly error messages.
- Study history is stored locally in the browser and is not synchronized across multiple devices.

---

# ⏱️ Time Spent

Approximately **8 hours**.

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Icons
- React Toastify

## Backend

- Node.js
- Express.js

## AI

- Google Gemini API

## Libraries

- jsPDF
- pdf.js

---

# 📂 Project Structure

```text
ai-study-assistant/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── App.jsx
│
├── server/
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── screenshots/
│   ├── home.png
│   ├── study-kit.png
│   ├── flashcards.png
│   ├── quiz.png
│   └── history.png
│
├── public/
│
└── README.md
```

---

# 📸 Screenshots

## 🏠 Home Page

![Home](screenshots/home.png)

---

## 📚 Generated Study Kit

![Study Kit](screenshots/study-kit.png)

---

## 🧠 Flashcards

![Flashcards](screenshots/flashcards.png)

---

## 📝 Interactive Quiz

![Quiz](screenshots/quiz.png)

---

## 🕘 Study History

![History](screenshots/history.png)

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/srikanthP1106/ai-study-assistant.git
```

## Navigate to the project

```bash
cd ai-study-assistant
```

## Install frontend dependencies

```bash
npm install
```

## Install backend dependencies

```bash
cd server
npm install
```

## Create a `.env` file inside the `server` folder

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

## Start the backend server

```bash
cd server
npm start
```

## Start the frontend

```bash
npm run dev
```

---

# 💡 Future Improvements

- User authentication
- Cloud database integration
- AI difficulty levels
- Dark/Light mode
- Multiple AI model support
- Share study kits
- Voice-based study mode
- AI-powered follow-up refinement
- Streaming AI responses

---

# 👨‍💻 Author

**Srikanth Paruchuri**

GitHub:
https://github.com/srikanthP1106

---

# 📄 License

This project is licensed under the MIT License.