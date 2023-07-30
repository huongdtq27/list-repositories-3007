import React from "react";
import { Table } from "antd";
import { REPOSITORY_COLUMNS } from "./constants";
import "./RepositoryList.scss";

//Mock data
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

const RepositoryList: React.FC = () => {
  return (
    <div className="list-repository-page">
      <h2>GITHUB REPOSITORIES</h2>

      <Table
        columns={REPOSITORY_COLUMNS}
        dataSource={mockData.user.repositories.nodes}
        className="list-repository-table"
      />
    </div>
  );
};

export default RepositoryList;
