import React, { BaseSyntheticEvent, useMemo, useState } from "react";
import { Alert, Input, Table } from "antd";
import { LIMIT_RECORDS, QUERY_GET_REPOSITORIES, REPOSITORY_COLUMNS, SEARCH_KEYS } from "./constants";
import { useQuery } from "@apollo/client";
import { DEFAULT_GIHUB_LOGIN_USER } from "../../auth";
import "./RepositoryList.scss";
import { Repository } from "../../typings/repository";

const { Search } = Input;

const RepositoryList: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const { loading, error, data } = useQuery(QUERY_GET_REPOSITORIES, {
    variables: { limit: LIMIT_RECORDS, loginUser: DEFAULT_GIHUB_LOGIN_USER },
  });

  const originalRepositories = useMemo(() => {
    if (loading || error) {
      return [];
    }
    return data?.user?.repositories?.nodes || [];
  }, [loading, error, data]);

  const filteredRepositories = useMemo(() => {
    if (!originalRepositories.length) return [];

    if (!searchValue || searchValue === "" || searchValue.trim() === "") {
      return originalRepositories;
    }
    const trimLowerCaseSearchValue = searchValue.toLowerCase().trim();
    const filteredList = originalRepositories.filter((record: Repository) =>
      SEARCH_KEYS.some((recordKey) =>
        record[recordKey as keyof Repository]?.toString().toLowerCase().includes(trimLowerCaseSearchValue)
      )
    );
    return filteredList as Repository[];
  }, [originalRepositories, searchValue]);

  const onChangeSearch = ({ target: { value } }: BaseSyntheticEvent) => {
    setSearchValue(value);
  };

  return (
    <div className="list-repository-page">
      {error && <Alert message={error.message} type="error" showIcon closeIcon />}

      <h2>GITHUB REPOSITORIES</h2>
      <Search onChange={onChangeSearch} className="search-field" size="large" placeholder="Search repository" />
      <Table
        columns={REPOSITORY_COLUMNS}
        dataSource={filteredRepositories}
        loading={loading}
        className="list-repository-table"
      />
    </div>
  );
};

export default RepositoryList;
