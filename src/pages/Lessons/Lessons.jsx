import { useState } from "react";
import { useLessons } from "../../hooks/useLessons";
import { useLanguage } from "../../context/LanguageContext";
import { LessonCard } from "../../components/LessonCard/LessonCard";
import { Modal } from "../../components/Modal/Modal";
import { getStudentsBySubject } from "../../services/lessonsService";
import { subjectIcons } from "../../data/subjectIcons";
import { BookOpen } from "lucide-react";
import "./Lessons.css";

export function Lessons() {
  const { lessons, loading, error } = useLessons();
  const { t } = useLanguage();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);

  const handleOpenLesson = async (lesson) => {
    setSelectedLesson(lesson);
    setStudentsLoading(true);
    try {
      const data = await getStudentsBySubject(lesson.name);
      setStudents(data);
    } catch {
      setStudents([]);
    } finally {
      setStudentsLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedLesson(null);
    setStudents([]);
  };

  const selectedLabel = selectedLesson
    ? t.subjects[selectedLesson.name] || selectedLesson.name
    : "";

  return (
    <div className="lessons-page">
      <h1 className="page-title">{t.lessons.title}</h1>
      <p className="page-subtitle">{t.lessons.subtitle}</p>

      {loading && <p className="loading-text">{t.common.loading}</p>}
      {error && <p className="error-text">{t.common.error}</p>}

      {!loading && !error && (
        <div className="lessons-grid">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              Icon={subjectIcons[lesson.name] || BookOpen}
              name={t.subjects[lesson.name] || lesson.name}
              studentsLabel={`${lesson.studentsCount} ${t.lessons.students}`}
              onClick={() => handleOpenLesson(lesson)}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={!!selectedLesson}
        onClose={handleClose}
        title={selectedLabel}
      >
        {studentsLoading && (
          <p className="loading-text">{t.lessons.loadingStudents}</p>
        )}

        {!studentsLoading && students.length === 0 && (
          <p className="empty-text">{t.lessons.emptyStudents}</p>
        )}

        {!studentsLoading && students.length > 0 && (
          <ul className="students-list">
            {students.map((student) => (
              <li key={student.id} className="student-item">
                <span className="student-name">
                  {student.firstName} {student.lastName}
                </span>
                <span className="student-group">{student.group}</span>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </div>
  );
}
