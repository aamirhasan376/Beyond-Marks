import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

if (!window.localStorage || typeof window.localStorage.getItem !== "function") {
  const store = {};
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => { store[key] = String(value); },
      removeItem: (key) => { delete store[key]; },
      clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
    },
    writable: true,
  });
}

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  document.documentElement.classList.remove("dark");
});
import { MemoryRouter } from "react-router-dom";
import App from "../App.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import { ThemeProvider, useTheme } from "../context/ThemeContext.jsx";

function renderApp(initialRoute = "/") {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
}

describe("Beyond Marks smoke test", () => {
  it("renders home page", () => {
    renderApp("/");
    expect(screen.getByText(/No marks. No rankings./i)).toBeTruthy();
  });

  it("full signup -> dashboard -> reflect -> sees a question", async () => {
    renderApp("/signup");
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: "Test User" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/^Password$/i), { target: { value: "password123" } });
    fireEvent.click(screen.getByRole("button", { name: /Create account/i }));

    // should now be on dashboard
    expect(await screen.findByText(/Welcome back/i)).toBeTruthy();

    // click "Begin your journey"
    fireEvent.click(screen.getByRole("link", { name: /Begin your journey/i }));

    // should now show the first question
    const q = await screen.findByText(/A free Saturday afternoon, no plans/i);
    expect(q).toBeTruthy();

    // answer options should be visible and clickable
    const option = screen.getByText(/Sketch, write, or make something just because/i);
    expect(option).toBeTruthy();
    fireEvent.click(option);

    // should advance to question 2
    const q2 = await screen.findByText(/A group project just got assigned/i);
    expect(q2).toBeTruthy();
  });
});

describe("Dark mode toggle", () => {
  it("toggles the dark class on the html element", () => {
    function Toggler() {
      const { dark, toggleDark } = useTheme();
      return <button onClick={toggleDark}>{dark ? "dark" : "light"}</button>;
    }
    render(<ThemeProvider><Toggler /></ThemeProvider>);
    const before = document.documentElement.classList.contains("dark");
    fireEvent.click(screen.getByRole("button"));
    const after = document.documentElement.classList.contains("dark");
    expect(after).toBe(!before);
    expect(window.localStorage?.getItem?.("bm_theme")).toBe(after ? "dark" : "light");
    fireEvent.click(screen.getByRole("button"));
    expect(document.documentElement.classList.contains("dark")).toBe(before);
  });
});

describe("Password visibility toggle", () => {
  it("toggles password visibility on signup form", () => {
    renderApp("/signup");
    const passwordInput = screen.getByLabelText(/^Password$/i);
    expect(passwordInput.getAttribute("type")).toBe("password");

    const toggleBtn = screen.getByRole("button", { name: /Show password/i });
    expect(toggleBtn).toBeTruthy();

    fireEvent.click(toggleBtn);
    expect(passwordInput.getAttribute("type")).toBe("text");
    expect(screen.getByRole("button", { name: /Hide password/i })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /Hide password/i }));
    expect(passwordInput.getAttribute("type")).toBe("password");
  });

  it("toggles password visibility on login form", () => {
    renderApp("/login");
    const passwordInput = screen.getByLabelText(/^Password$/i);
    expect(passwordInput.getAttribute("type")).toBe("password");

    const toggleBtn = screen.getByRole("button", { name: /Show password/i });
    fireEvent.click(toggleBtn);
    expect(passwordInput.getAttribute("type")).toBe("text");

    fireEvent.click(screen.getByRole("button", { name: /Hide password/i }));
    expect(passwordInput.getAttribute("type")).toBe("password");
  });
});

