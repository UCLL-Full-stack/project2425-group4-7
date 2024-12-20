import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { useAuth, getUserRole, logout } from "../components/auth/auth";

beforeEach(() => {
  localStorage.clear();
});

test("Test if useAuth correctly detects authentication", async () => {
  localStorage.setItem(
    "loggedInUser",
    JSON.stringify({ username: "testuser", role: "admin" })
  );

  const TestComponent = () => {
    const authenticated = useAuth();
    return <div>{authenticated ? "Authenticated" : "Not Authenticated"}</div>;
  };

  render(<TestComponent />);

  expect(screen.getByText("Authenticated")).toBeInTheDocument();
});

test("Test getUserRole function", () => {
  localStorage.setItem(
    "loggedInUser",
    JSON.stringify({ username: "testuser", role: "admin" })
  );

  const role = getUserRole();
  expect(role).toBe("admin");
});

test("Test logout function clears localStorage and updates auth status", () => {
  localStorage.setItem(
    "loggedInUser",
    JSON.stringify({ username: "testuser", role: "admin" })
  );

  expect(localStorage.getItem("loggedInUser")).toBeTruthy();

  act(() => logout());

  expect(localStorage.getItem("loggedInUser")).toBeNull();
});
