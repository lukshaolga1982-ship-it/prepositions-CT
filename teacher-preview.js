// Teacher preview is independent of student accounts, progress and scores.
export const isTeacherPreview = role => role === 'teacher';
export const isCourseCardLocked = (role, cardId, unlocked) => !isTeacherPreview(role) && cardId > unlocked;
export const isCheckpointLocked = (role, module, completed) => !isTeacherPreview(role) && !completed[module * 5];
export const shouldRecordTraining = role => role === 'student';
