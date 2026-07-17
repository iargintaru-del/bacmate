import { Route, Routes, useParams } from "react-router-dom";
import { Home } from "./pages/Home";
import { TopicQuiz } from "./pages/TopicQuiz";
import { SetPicker } from "./pages/SetPicker";
import { Exam } from "./pages/Exam";
import { VariantPicker } from "./pages/VariantPicker";
import { Stats } from "./pages/Stats";

function ExamVariantRoute() {
  const { number } = useParams<{ number: string }>();
  return <Exam key={number} />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz/:topic" element={<TopicQuiz />} />
      <Route path="/quiz/:topic/sets" element={<SetPicker />} />
      <Route path="/quiz/:topic/set/:setNumber" element={<TopicQuiz />} />
      <Route path="/exam" element={<Exam />} />
      <Route path="/exam/variants" element={<VariantPicker />} />
      <Route path="/exam/variant/:number" element={<ExamVariantRoute />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  );
}
