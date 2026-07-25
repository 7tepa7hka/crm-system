import { useState } from "react";
import { useLessons } from "../../hooks/useLessons";
import { LessonCard } from "../../components/LessonCard/LessonCard";
import { Modal } from "../../components/Modal/Modal";
import { getStudentsBySubject } from "../../services/lessonsService";
import "./Lessons.css";

export function Lessons() {
  const { lessons, loading, error } = useLessons();
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

  return (
    <div className="lessons-page">
      <h1 className="page-title">Lessons</h1>
      <p className="page-subtitle">Предметы учебного центра и их ученики в филиале Eco Bozor</p>

      {loading && <p className="loading-text">Загрузка...</p>}
      {error && <p className="error-text">Ошибка загрузки: {error}</p>}

      {!loading && !error && (
        <div className="lessons-grid">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              icon={lesson.icon}
              name={lesson.name}
              studentsCount={lesson.studentsCount}
              onClick={() => handleOpenLesson(lesson)}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={!!selectedLesson}
        onClose={handleClose}
        title={
          selectedLesson ? `${selectedLesson.icon} ${selectedLesson.name}` : ""
        }
      >
        {studentsLoading && (
          <p className="loading-text">Загрузка учеников...</p>
        )}

        {!studentsLoading && students.length === 0 && (
          <p className="empty-text">Пока нет учеников по этому предмету</p>
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
