/* eslint-disable testing-library/prefer-screen-queries */
/*
Test basic rendering of todolist

Test functionality of todolist

*/
import { fireEvent, render } from "@testing-library/react";
import App from "../../App";
import Todo from "../Todo";

describe("Basic rendering of todo", () => {
  it("Should render todo list", () => {
    const { getByTestId } = render(<Todo />);
    expect(getByTestId("todo-text")).toBeDefined();
  });

  it("Should render checkbox", () => {
    const { getByRole } = render(<Todo />);
    expect(getByRole("checkbox")).toBeDefined();
  });

  it("Should render edit and delete button", () => {
    const { getByTestId } = render(<Todo />);
    expect(getByTestId("edit")).toBeDefined();
    expect(getByTestId("delete")).toBeDefined();
  });
});

describe("Functionality of todos", () => {
  it("Should toggle strikeout on toggling checkboxes", () => {
    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId("check"));
    expect(getByTestId("check")).toBeChecked();
  });

  it("edit button switches to edit view", () => {
    const { getByTestId, queryByTestId } = render(<Todo />);
    fireEvent.click(getByTestId("edit"));
    expect(getByTestId("edit-view")).toBeInTheDocument();
    expect(queryByTestId("check-view")).not.toBeInTheDocument();
  });

  it("edit view should have same content as check-view", () => {
    const { getByTestId } = render(<Todo />);
    // const todoText = container.querySelector('[data-testid="todo-text"]');
    const todoText = getByTestId("todo-text");
    fireEvent.click(getByTestId("edit"));
    expect(getByTestId("edit-text")).toHaveValue(todoText.textContent);
  });

  it("cancel button switches to check-view", () => {
    const { getByTestId, queryByTestId } = render(<Todo />);
    fireEvent.click(getByTestId("edit"));
    expect(getByTestId("edit-view")).toBeInTheDocument();
    expect(queryByTestId("check-view")).not.toBeInTheDocument();
    fireEvent.click(getByTestId("cancel"));
    expect(getByTestId("check-view")).toBeInTheDocument();
    expect(queryByTestId("edit-view")).not.toBeInTheDocument();
  });

  it("delete removes todo with the respective id", () => {
    const { getByTestId, queryByTestId } = render(<App />);
    fireEvent.click(getByTestId("delete"));
    expect(queryByTestId("delete")).not.toBeInTheDocument();
  });

  it("save should update todo", () => {
    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId("edit"));
    fireEvent.change(getByTestId("edit-text"), {
      target: { value: "Make Noodles" },
    });
    expect(getByTestId("edit-text").value).toBe("Make Noodles");
  });
});
