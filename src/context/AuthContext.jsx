import React, { createContext, useContext, useEffect, useState } from "react";

// NOTE: This is a local-only, demo-grade auth system.
// Accounts and passwords live in the browser's localStorage, unencrypted.
// Fine for testing the product idea — NOT for real passwords or real user
// data. Swap this for a real backend (Firebase Auth, Supabase, etc.)
// before launching publicly.

const AuthContext = createContext(null);
const USERS_KEY = "bm_users";
const SESSION_KEY = "bm_session";

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return localStorage.getItem(SESSION_KEY) || null;
    } catch {
      return null;
    }
  });
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (user) localStorage.setItem(SESSION_KEY, user);
      else localStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
  }, [user]);

  function signup(name, email, password) {
    setError("");
    const users = loadUsers();
    const key = email.trim().toLowerCase();
    if (!key || !password || !name.trim()) {
      setError("Please fill in every field.");
      return false;
    }
    if (users[key]) {
      setError("An account with that email already exists.");
      return false;
    }
    users[key] = { name: name.trim(), password, createdAt: new Date().toISOString() };
    saveUsers(users);
    setUser(key);
    return true;
  }

  function login(email, password) {
    setError("");
    const users = loadUsers();
    const key = email.trim().toLowerCase();
    const record = users[key];
    if (!record || record.password !== password) {
      setError("That email and password don't match our records.");
      return false;
    }
    setUser(key);
    return true;
  }

  function logout() {
    setUser(null);
  }

  function currentUserName() {
    if (!user) return "";
    const users = loadUsers();
    return users[user]?.name || user;
  }

  return (
    <AuthContext.Provider value={{ user, error, setError, signup, login, logout, currentUserName }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
