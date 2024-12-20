import React from "react";
window.React = React;
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import LanguageDropdown from "../components/utils/langdrop";
import { i18n } from "next-i18next";
import router, { useRouter } from "next/router";

jest.mock("next-i18next", () => ({
  i18n: {
    language: "nl",
    changeLanguage: jest.fn(),
  },
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
  push: jest.fn(),
}));

describe("LanguageDropdown", () => {
  let pushMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
      pathname: "/",
      query: {},
      asPath: "/",
    });
  });

  test("renders language button and shows the selected language", () => {
    render(<LanguageDropdown />);
    expect(screen.getByText("Nederlands")).toBeInTheDocument();
  });

  test("toggles the dropdown when the button is clicked", () => {
    render(<LanguageDropdown />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Français")).toBeInTheDocument();
    expect(screen.getByText("Deutsch")).toBeInTheDocument();
  });

  test("changes language when a new language is selected", async () => {
    render(<LanguageDropdown />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const languageOption = screen.getByText("Deutsch");
    fireEvent.click(languageOption);
    await act(async () => {
      expect(i18n?.changeLanguage).toHaveBeenCalledWith("de");
    });
  });
});
