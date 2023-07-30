import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { QUERY_GET_REPOSITORIES } from "./constants";
import { DEFAULT_GIHUB_LOGIN_USER } from "../../auth";
import RepositoryList from "./index";

// Mock data
const NUMBER_OF_RECORDS = 5;
const mockData = {
  user: {
    repositories: {
      nodes: Array.from({ length: NUMBER_OF_RECORDS }, (item, index) => ({
        name: `Repo of Milo ${index}`,
        key: `${index}`,
        description: "Project is awesome",
        forkCount: index * 5,
        stargazerCount: index * 10,
        url: "www.mock.com",
        projectsUrl: "www.projectMock.com",
      })),
      totalCount: NUMBER_OF_RECORDS,
    },
  },
};

const mockProvider = [
  {
    request: {
      query: QUERY_GET_REPOSITORIES,
      variables: { limit: 50, loginUser: DEFAULT_GIHUB_LOGIN_USER },
    },
    result: {
      data: mockData,
    },
  },
];

//Test
describe("RepositoryList", () => {
  it("Should renders the Search and Table", async () => {
    render(
      <MockedProvider mocks={mockProvider} addTypename={false}>
        <RepositoryList />
      </MockedProvider>
    );
    expect(screen.getByLabelText("search")).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("Should display rows table if get data successfully", async () => {
    render(
      <MockedProvider mocks={mockProvider} addTypename={false}>
        <RepositoryList />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(screen.queryByText(/No data/i)).not.toBeInTheDocument();
    });
    expect(screen.getAllByRole("row").length).toEqual(mockData.user.repositories.totalCount + 1); //1 header + rows
  });

  it("Should display empty table if get data fail", async () => {
    const mockFail = {
      request: {
        query: QUERY_GET_REPOSITORIES,
        variables: { limit: 50, loginUser: DEFAULT_GIHUB_LOGIN_USER },
      },
      error: new Error("An error occurred"),
    };
    render(
      <MockedProvider mocks={[mockFail]} addTypename={false}>
        <RepositoryList />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("An error occurred")).toBeInTheDocument();
    });
    expect(screen.getAllByRole("row").length).toEqual(2); //1 header, 1 row
  });

  it("Should filters the repositories based on the search value", async () => {
    render(
      <MockedProvider mocks={mockProvider} addTypename={false}>
        <RepositoryList />
      </MockedProvider>
    );
    const searchField = screen.getByRole("textbox");
    fireEvent.change(searchField, { target: { value: "Repo of Milo 0" } });
    await waitFor(() => {
      expect(screen.getAllByRole("row").length).toEqual(2); // 1 header, 1 row
    });
    await waitFor(() => {
      expect(screen.getByText(/Repo of Milo 0/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText(/Repo of Milo 1/i)).not.toBeInTheDocument();
    });
  });
});
