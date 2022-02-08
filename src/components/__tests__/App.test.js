import { fireEvent, render, screen } from "@testing-library/react";
import App from "../../App";

describe("Basic rendering of add function", () => {
  it("should render add", () => {
    render(<App />);
    const addButton = screen.getByTestId("add");
    const addInput = screen.getByTestId("input-todo");
    expect(addButton).toBeInTheDocument();
    expect(addInput).toBeInTheDocument();
  });
});

describe("Test functionality of add", () => {
  it("should add new todo to the list", () => {
    render(<App />);
    const addButton = screen.getByTestId("add");
    const initialLists = screen.getAllByTestId("todo-text").length;
    fireEvent.change(screen.getByTestId("input-todo"), {
      target: { value: "Make Noodles" },
    });
    fireEvent.click(addButton);
    expect(screen.getAllByTestId("todo-text").length).toBe(initialLists + 1);
    expect(screen.getByTestId("input-todo").value.length).toBe(0);
  });
});
