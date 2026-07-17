import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { TopicQuiz } from "./pages/TopicQuiz";
import { Exam } from "./pages/Exam";
import { Stats } from "./pages/Stats";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz/:topic" element={<TopicQuiz />} />
      <Route path="/exam" element={<Exam />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  );
}
