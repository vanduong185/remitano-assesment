import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import * as userApi from "../../api/users";
import SignUp from "./";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("signup-page", () => {
  test("render signup page", async () => {
    render(<SignUp />);

    const emailInput = screen.getByLabelText("Email Address *") as any;
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText("Password *") as any;
    expect(passwordInput).toBeInTheDocument();

    const confimPasswordInput = screen.getByLabelText(
      "Confirm Password *"
    ) as any;
    expect(confimPasswordInput).toBeInTheDocument();

    const signUpButton = screen.getByRole("button", {
      name: "Submit",
    });
    expect(signUpButton).toBeInTheDocument();
  });

  test("signup page - validate input", async () => {
    render(<SignUp />);

    const signUpButton = screen.getByRole("button", {
      name: "Submit",
    });

    // empty inputs
    fireEvent.click(signUpButton);
    const requiredTexts = await screen.findAllByText("Required");
    expect(requiredTexts.length).toEqual(3);
  });

  test("sign up page - sign up successfully", async () => {
    jest.spyOn(userApi, "registerUser").mockResolvedValue({ data: {} } as any);

    render(
      <>
        <ToastContainer autoClose={3000} position="bottom-right" />
        <SignUp />
      </>
    );

    const emailInput = screen.getByLabelText("Email Address *") as any;
    fireEvent.change(emailInput, {
      target: { value: "test@yopmail.com" },
    });

    const passwordInput = screen.getByLabelText("Password *") as any;
    fireEvent.change(passwordInput, {
      target: { value: "123456" },
    });

    const cfPasswordInput = screen.getByLabelText("Confirm Password *") as any;
    fireEvent.change(cfPasswordInput, {
      target: { value: "123456" },
    });

    const submitButton = screen.getByRole("button", {
      name: "Submit",
    });
    fireEvent.click(submitButton);

    expect(await screen.findByText("Register successfully")).toBeVisible();
  });

  test("sign up page - sign up failed", async () => {
    jest.spyOn(userApi, "registerUser").mockRejectedValue({});

    render(
      <>
        <ToastContainer autoClose={3000} position="bottom-right" />
        <SignUp />
      </>
    );

    const emailInput = screen.getByLabelText("Email Address *") as any;
    fireEvent.change(emailInput, {
      target: { value: "test@yopmail.com" },
    });

    const passwordInput = screen.getByLabelText("Password *") as any;
    fireEvent.change(passwordInput, {
      target: { value: "123456" },
    });

    const cfPasswordInput = screen.getByLabelText("Confirm Password *") as any;
    fireEvent.change(cfPasswordInput, {
      target: { value: "123456" },
    });

    const submitButton = screen.getByRole("button", {
      name: "Submit",
    });
    fireEvent.click(submitButton);

    expect(await screen.findByText("Register failed")).toBeVisible();
  });

  test("sign up page - go to login", async () => {
    render(<SignUp />);

    const loginButton = screen.getByRole("button", {
      name: "Log In",
    });
    fireEvent.click(loginButton);

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/login");
  });
});
