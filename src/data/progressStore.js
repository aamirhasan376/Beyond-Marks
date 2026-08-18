// Per-user progress persistence, keyed by the logged-in user's email.
// Local-only (localStorage) — matches the local-only auth in AuthContext.

const DEFAULT_PROGRESS = {
  answers: [],
  lastAnsweredDate: null,
  answeredToday: 0,
  completedDates: [],
  chosenZone: null,
  journal: "",
  finished: false,
};

function key(user) {
  return `bm_progress_${user}`;
}

export function loadProgress(user) {
  try {
    const raw = localStorage.getItem(key(user));
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROGRESS, ...parsed };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveProgress(user, progress) {
  try {
    localStorage.setItem(key(user), JSON.stringify(progress));
    return true;
  } catch {
    return false;
  }
}

export function resetProgress(user) {
  saveProgress(user, DEFAULT_PROGRESS);
  return { ...DEFAULT_PROGRESS };
}

export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export { DEFAULT_PROGRESS };
