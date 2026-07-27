import { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import { extractTextFromPDF } from "../utils/pdfExtractor";
import Quiz from "../components/quiz/Quiz";
import History from "../components/history/History";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";

function Home() {
    

  const [notes, setNotes] = useState("");
  const [studyKit, setStudyKit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const [history, setHistory] = useState(() => {
  const saved = localStorage.getItem("studyHistory");
  return saved ? JSON.parse(saved) : [];
});
const [searchTerm, setSearchTerm] = useState("");

const abortControllerRef = useRef(null);

  const handleGenerate = async () => {
    if (!notes.trim()) {
      toast.warning("Please enter your study notes first.");
      return;
    }
    latestRequestId.current += 1;


    if (abortControllerRef.current) {
  abortControllerRef.current.abort();
}

abortControllerRef.current = new AbortController();

    setLoading(true);
    setFlippedCards({});
    

    try {
      const response = await fetch("https://ai-study-assistant-8ogw.onrender.com/generate",{
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    notes,
  }),
  signal: abortControllerRef.current.signal,
});

      const apiResponse = await response.json();

      if (data.success) {
  const generatedStudyKit = apiResponse.result;

  if (
    !result ||
    typeof result.summary !== "string" ||
    !Array.isArray(result.flashcards) ||
    !Array.isArray(result.quiz)
  ) {
    toast.error("AI returned an invalid response. Please try again.");
    return;
  }

  


setStudyKit(result);

  const newItem = {
    id: crypto.randomUUID(),
    title: notes.split("\n")[0].trim().substring(0, 50),
    date: new Date().toLocaleString(),
    studyKit: result,
  };
  if (currentRequestId !== latestRequestId.current) {
    return;
}

  const updatedHistory = [newItem, ...history];

  setHistory(updatedHistory);

  localStorage.setItem(
    "studyHistory",
    JSON.stringify(updatedHistory)
  );
} else {
  toast.error(data.message);
}
    } catch (error) {
  if (error.name === "AbortError") {
  return;
}

console.error("Server Error:", error);
toast.error("Unable to connect to the server.");
} finally  {
      setLoading(false);
    }
  };

  
  const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(
      JSON.stringify(studyKit, null, 2)
    );
    toast.success("Study Kit copied to clipboard!");
  } catch (error) {
    toast.error("Failed to copy.");
  }
};

const handleFlip = (index) => {
  setFlippedCards((prev) => ({
    ...prev,
    [index]: !prev[index],
  }));
};

const handlePDFUpload = async (event) => {
  const file = event.target.files[0];

  if (!file) return;

  if (file.type !== "application/pdf") {
    toast.warning("Please upload a PDF file.");
    return;
  }

  try {
    const extractedText = await extractTextFromPDF(file);
    setNotes(extractedText);
    toast.success("PDF loaded successfully!");
  } catch (error) {
    console.error(error);
    toast.error("Failed to read PDF.");
  }
  
};
const downloadPDF = () => {
  if (!studyKit) return;

  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);
  doc.text("AI Study Assistant", 20, y);

  y += 15;

  doc.setFontSize(16);
  doc.text("Summary", 20, y);

  y += 10;

  const summaryLines = doc.splitTextToSize(
    studyKit.summary,
    170
  );

  doc.setFontSize(12);
  doc.text(summaryLines, 20, y);

  y += summaryLines.length * 7 + 10;

  doc.setFontSize(16);
  doc.text("Flashcards", 20, y);

  y += 10;

  studyKit.flashcards.forEach((card, index) => {
    doc.setFontSize(12);

    doc.text(
      `${index + 1}. ${card.question}`,
      20,
      y
    );

    y += 7;

    doc.text(
      `Answer: ${card.answer}`,
      25,
      y
    );

    y += 12;
  });

  doc.addPage();

  y = 20;

  doc.setFontSize(16);
  doc.text("Quiz", 20, y);

  y += 10;

  studyKit.quiz.forEach((q, index) => {
    doc.setFontSize(12);

    doc.text(
      `${index + 1}. ${q.question}`,
      20,
      y
    );

    y += 7;

    q.options.forEach((option) => {
      doc.text(`• ${option}`, 25, y);
      y += 6;
    });

    doc.text(
      `Correct Answer: ${q.correctAnswer}`,
      25,
      y
    );

    y += 10;
  });

  doc.save("AI_Study_Kit.pdf");
};
const handleDeleteHistory = (id) => {
  const updatedHistory = history.filter((item) => item.id !== id);

  setHistory(updatedHistory);

  localStorage.setItem(
    "studyHistory",
    JSON.stringify(updatedHistory)
  );
};
  

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-4xl bg-slate-900 rounded-2xl shadow-2xl p-8">
        <h1 className="text-5xl font-bold text-white text-center">
          AI Study Assistant
        </h1>

        <p className="text-gray-400 text-center mt-4">
          Paste your study notes below and let AI generate interactive
          flashcards and quizzes.
        </p>
        <div className="mt-8">
  <label className="block mb-3 text-white font-semibold">
    📄 Upload Lecture Notes (PDF)
  </label>

  <input
    type="file"
    accept=".pdf"
    onChange={handlePDFUpload}
    className="block w-full text-white bg-slate-800 border border-slate-700 rounded-lg p-3 cursor-pointer"
  />
</div>

        <textarea
          rows={10}
          placeholder="Example: Explain Java OOP concepts..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full mt-8 p-4 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <button
  onClick={handleGenerate}
  disabled={loading}
  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition duration-300"
>
  {loading ? (
    <div className="flex items-center justify-center gap-2">
      <FaSpinner className="animate-spin" />
      <span>AI is generating your study kit...</span>
    </div>
  ) : (
    <>
🚀 Generate Study Kit
</>
  )}
</button>

        {studyKit && (
          <div className="mt-8 bg-slate-900 border border-slate-700 rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                📚 AI Study Kit
              </h2>

              <button
                onClick={handleCopy}
                className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-semibold text-white transition"
              >
                📋 Copy Study Kit
              </button>
              <button
  onClick={downloadPDF}
  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold"
>
  📄 Download PDF
</button>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 text-gray-200">

  <h3 className="text-2xl font-bold mb-4">
    📖 Summary
  </h3>

  <p className="mb-8">
    {studyKit.summary}
  </p>

  <h3 className="text-2xl font-bold mb-4">
  🧠 Flashcards
</h3>

<div className="grid md:grid-cols-2 gap-6">
  {studyKit?.flashcards?.map((card, index) => (
    <div
      key={index}
      onClick={() => handleFlip(index)}
      className="cursor-pointer bg-slate-700 hover:bg-slate-600 rounded-xl p-6 transition duration-300 shadow-lg min-h-[180px] flex items-center justify-center text-center"
    >
      {!flippedCards[index] ? (
        <div>
          <h4 className="text-xl font-bold mb-4">
            ❓ Question
          </h4>

          <p>{card.question}</p>

          <p className="text-blue-400 mt-6">
            Click to reveal answer
          </p>
        </div>
      ) : (
        <div>
          <h4 className="text-xl font-bold mb-4 text-green-400">
            ✅ Answer
          </h4>

          <p>{card.answer}</p>

          <p className="text-gray-400 mt-6">
            Click again to hide
          </p>
        </div>
      )}
    </div>
  ))}
</div>

  <h3 className="text-2xl font-bold mt-8 mb-4">
  📝 Interactive Quiz
</h3>

{studyKit?.quiz && (
  <Quiz
    key={JSON.stringify(studyKit.quiz)}
    quiz={studyKit.quiz}
  />
)}
</div>
          </div>
        )}
        <History
  history={history}
  setStudyKit={setStudyKit}
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  handleDeleteHistory={handleDeleteHistory}
/>
      </div>
    </main>
  );
}

export default Home;