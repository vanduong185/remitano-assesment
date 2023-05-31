import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as authContext from "../../context/AuthContext";
import SignIn from "./";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("signin-page", () => {
  test("render signin page", async () => {
    render(<SignIn />);

    const emailInput = screen.getByLabelText("Email Address *") as any;
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText("Password *") as any;
    expect(passwordInput).toBeInTheDocument();

    const signInButton = screen.getByRole("button", {
      name: "Sign In",
    });
    expect(signInButton).toBeInTheDocument();
  });

  test("signin page - validate input", async () => {
    render(<SignIn />);

    const signInButton = screen.getByRole("button", {
      name: "Sign In",
    });

    // empty inputs
    fireEvent.click(signInButton);
    const requiredTexts = await screen.findAllByText("Required");
    expect(requiredTexts.length).toEqual(2);
  });

  test("signin page - signed in successfully", async () => {
    jest.spyOn(authContext, "useAuth").mockReturnValue({
      logIn: () => ({ id: 1, username: "test@yopmail.com" }),
    } as any);

    render(<SignIn />);

    const emailInput = screen.getByLabelText("Email Address *") as any;
    fireEvent.change(emailInput, {
      target: { value: "test@yopmail.com" },
    });

    const passwordInput = screen.getByLabelText("Password *") as any;
    fireEvent.change(passwordInput, {
      target: { value: "123456" },
    });

    const signInButton = screen.getByRole("button", {
      name: "Sign In",
    });
    fireEvent.click(signInButton);

    await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledWith("/"));
  });

  test("signin page - signed in failed", async () => {
    // const navigate = useNavigate();
    jest.spyOn(authContext, "useAuth").mockReturnValue({
      logIn: () => undefined,
    } as any);

    render(<SignIn />);

    const emailInput = screen.getByLabelText("Email Address *") as any;
    fireEvent.change(emailInput, {
      target: { value: "test@yopmail.com" },
    });

    const passwordInput = screen.getByLabelText("Password *") as any;
    fireEvent.change(passwordInput, {
      target: { value: "123456" },
    });

    const signInButton = screen.getByRole("button", {
      name: "Sign In",
    });
    fireEvent.click(signInButton);

    expect(
      await screen.findByText("Email or password is not correct")
    ).toBeVisible();
  });
});
