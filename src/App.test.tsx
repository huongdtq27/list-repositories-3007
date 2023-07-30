import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./pages/repositoryList/RepositoryList", () => {
  return function MockRepositoryList() {
    return <div data-testid="mock-repo-list">Mock Repository List</div>;
  };
});

describe("App", () => {
  it("Should renders the RepositoryList component", () => {
    render(<App />);
    expect(screen.getByTestId("mock-repo-list")).toBeInTheDocument();
  });
});
