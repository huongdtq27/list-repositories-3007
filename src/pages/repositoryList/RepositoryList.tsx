import React from "react";
import { Alert, Table } from "antd";
import { LIMIT_RECORDS, QUERY_GET_REPOSITORIES, REPOSITORY_COLUMNS } from "./constants";
import { useQuery } from "@apollo/client";
import { DEFAULT_GIHUB_LOGIN_USER } from "../../auth";
import "./RepositoryList.scss";

const RepositoryList: React.FC = () => {
  const { loading, error, data } = useQuery(QUERY_GET_REPOSITORIES, {
    variables: { limit: LIMIT_RECORDS, loginUser: DEFAULT_GIHUB_LOGIN_USER },
  });

  return (
    <div className="list-repository-page">
      {error && <Alert message={error.message} type="error" showIcon closeIcon />}

      <h2>GITHUB REPOSITORIES</h2>

      <Table
        columns={REPOSITORY_COLUMNS}
        dataSource={data?.user?.repositories?.nodes}
        loading={loading}
        className="list-repository-table"
      />
    </div>
  );
};

export default RepositoryList;
