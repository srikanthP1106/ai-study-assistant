# AI Study Assistant

AI Study Assistant is a full-stack web application that transforms study notes or lecture PDFs into structured learning material using Google Gemini AI. Instead of displaying raw AI responses like a chatbot, the application validates the generated content and presents it as concise summaries, interactive flashcards, and multiple-choice quizzes.

The project was built as part of a Frontend Internship Assignment with a focus on responsive user experience, secure AI integration, structured data handling, and reliable error recovery.

## Live Demo

Frontend

https://ai-study-assistant-five-rouge.vercel.app

Backend

https://ai-study-assistant-8ogw.onrender.com

---

## Features

The application provides the following functionality.

- Generate AI-powered study summaries
- Generate interactive flashcards
- Generate multiple-choice quizzes
- Upload lecture notes in PDF format
- Download generated study kits as PDF
- Copy generated study kits to the clipboard
- Store study history locally
- Search previous study sessions
- Delete unwanted history
- Responsive user interface
- Loading indicators during AI generation
- Toast notifications
- Retry failed AI requests
- Validation of malformed AI responses

---

## How it works

```
Browser (React + Vite)
        │
        │
        ▼
Express Backend
        │
        │
        ▼
Google Gemini API
        │
        ▼
Validated JSON Response
        │
        ▼
Summary
Flashcards
Quiz
History
```

The browser collects either a study topic, custom notes, or text extracted from an uploaded PDF.

The request is sent to an Express backend that securely communicates with Google Gemini.

After receiving the response, the application validates the returned structure before rendering any content. Only valid data is displayed to the user.

This approach prevents malformed AI responses from breaking the user interface.

---

## AI Generation Pipeline

Every study session follows the same workflow.

```
User Input
      │
      ▼
Study Topic / Notes / PDF
      │
      ▼
Express Backend
      │
      ▼
Google Gemini
      │
      ▼
Structured Response
      │
      ▼
Validation
      │
      ▼
Summary
Flashcards
Quiz
```

The backend is responsible for communicating with Gemini while keeping the API key secure.

The frontend focuses on presenting the generated study material through an interactive learning experience.

---

## PDF Processing

Instead of manually copying large lecture notes, users can upload a PDF directly.

The application extracts text from the uploaded document and combines it with the user's request before sending it to Gemini.

```
Upload PDF
      │
      ▼
Extract Text
      │
      ▼
Send to Gemini
      │
      ▼
Generate Study Kit
```

This allows users to generate summaries, flashcards, and quizzes directly from lecture notes.

---

## Study History

Every generated study kit is automatically stored in Local Storage.

Users can

- revisit previous study sessions
- search by topic
- delete unwanted entries
- continue learning without generating the same content again

Since the history is stored locally, no user information is uploaded to a database.

---

## Response Validation

AI models do not always return perfectly structured responses.

Before displaying any generated content, the application validates the received data.

The following situations are handled gracefully.

| Situation | Behaviour |
| ---------- | --------- |
| Empty input | User is asked to enter valid content |
| Invalid AI response | Error message is displayed |
| Failed request | Retry option is available |
| Network failure | Friendly error notification |
| Slow response | Loading indicator remains visible |
| Missing content | Invalid sections are ignored safely |

These validation steps improve reliability and prevent unexpected AI responses from affecting the overall user experience.

---

## API Security

The Gemini API key is never exposed to the browser.

Every AI request passes through an Express backend using environment variables.

```
React Frontend
        │
        ▼
Express Backend
        │
        ▼
Google Gemini API
```

This architecture keeps the API credentials secure while allowing the frontend to communicate safely with the AI service.

---

## User Experience

The application was designed to provide a simple and distraction-free learning experience.

Key design goals include

- clean interface
- responsive layout
- minimal user interaction
- quick navigation
- interactive flashcards
- instant quiz scoring
- smooth loading experience
- informative notifications

The objective is to help students spend more time learning and less time organizing study material.
## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Icons
- React Toastify

### Backend

- Node.js
- Express.js

### AI

- Google Gemini API

### Libraries

- pdf.js
- jsPDF

---

## Project Structure

```
ai-study-assistant
│
├── public/
│
├── server/
│   ├── index.js
│   ├── package.json
│   └── .env
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── screenshots/
│   ├── home.png
│   ├── study-kit.png
│   ├── flashcards.png
│   ├── quiz.png
│   └── history.png
│
├── package.json
└── README.md
```

The frontend is responsible for user interaction, study history, PDF upload, and rendering AI-generated content.

The backend securely communicates with Google Gemini and returns structured responses to the frontend.

---

## Running the Project

### Requirements

- Node.js 18 or later
- Google Gemini API Key

Clone the repository.

```bash
git clone https://github.com/srikanthP1106/ai-study-assistant.git
```

Move into the project directory.

```bash
cd ai-study-assistant
```

Install frontend dependencies.

```bash
npm install
```

Move into the backend directory.

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory.

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Start the backend.

```bash
cd server
npm start
```

Open another terminal and start the frontend.

```bash
npm run dev
```

Open

```
http://localhost:5173
```

---

## Deployment

The application is deployed as two services.

Frontend

https://ai-study-assistant-five-rouge.vercel.app

Backend

https://ai-study-assistant-8ogw.onrender.com

The frontend communicates with the backend through secure HTTP requests. The backend is responsible for interacting with Google Gemini and protecting the API key.

---

## Testing

The project was manually tested using different input scenarios.

### Normal Input

- Study topic
- Custom notes
- Lecture PDFs

### Error Scenarios

- Empty input
- Invalid AI response
- Network interruption
- API request failure
- Slow AI response

### User Interaction

- Flashcard navigation
- Quiz scoring
- PDF upload
- PDF download
- Copy study kit
- Study history search
- Delete history

These scenarios were tested to ensure the application remains responsive and provides meaningful feedback to the user.

---

## AI Usage

AI tools (ChatGPT) were used as a development assistant for brainstorming ideas, debugging, reviewing implementation approaches, and improving documentation.

All application logic, feature implementation, Google Gemini integration, frontend development, backend development, testing, deployment, and final verification were completed and validated by the author.

---

## Known Limitations

- AI responses depend on the quality of the provided input.
- Very large PDF documents may require additional processing time.
- Study history is stored only in the browser using Local Storage.
- The application currently supports a single AI provider.
- Internet connectivity is required for AI content generation.

---

## Future Improvements

Possible enhancements include

- User authentication
- Cloud database integration
- Cross-device study history
- Multiple AI provider support
- AI difficulty selection
- Voice-assisted learning
- Dark mode
- Real-time streaming AI responses
- Study kit sharing
- Personalized learning recommendations

---

## Time Spent

Approximately **8 hours**

| Task | Time |
|------|------|
| Project setup and architecture | 1 hour |
| Gemini API integration | 1.5 hours |
| PDF upload and processing | 1 hour |
| Flashcards and quiz implementation | 1.5 hours |
| Study history and local storage | 1 hour |
| Error handling and validation | 1 hour |
| UI refinement, testing and deployment | 1 hour |

---

## Screenshots

### Home

```md
![Home](screenshots/home.png)
```

### Generated Study Kit

```md
![Study Kit](screenshots/study-kit.png)
```

### Flashcards

```md
![Flashcards](screenshots/flashcards.png)
```

### Quiz

```md
![Quiz](screenshots/quiz.png)
```

### Study History

```md
![History](screenshots/history.png)
```

---

## Author

**Srikanth Paruchuri**

GitHub

https://github.com/srikanthP1106

LinkedIn

https://www.linkedin.com/in/srikanth-paruchuri-476089259

---

## License

This project is licensed under the MIT License.