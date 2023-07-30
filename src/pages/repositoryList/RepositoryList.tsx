import React, { BaseSyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Divider, Input, Table } from "antd";
import { LIMIT_RECORDS, QUERY_GET_REPOSITORIES, REPOSITORY_COLUMNS, SEARCH_KEYS } from "./constants";
import { useLazyQuery } from "@apollo/client";
import { Repository } from "../../typings/repository";
import GitHubUserForm from "../../components/gitHubUserForm";
import { DEFAULT_GIHUB_LOGIN_USER } from "../../config";

import "./RepositoryList.scss";

const { Search } = Input;

export const RepositoryList: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const gitHubLoginUser = localStorage.getItem("gitHubUser");
  const [loadRepositories, { called, loading, error, data }] = useLazyQuery(QUERY_GET_REPOSITORIES, {
    variables: { limit: LIMIT_RECORDS, loginUser: gitHubLoginUser || DEFAULT_GIHUB_LOGIN_USER },
  });

  useEffect(() => {
    loadRepositories();
  }, [loadRepositories]);

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
    return filteredList;
  }, [searchValue, originalRepositories]);

  const onChangeSearch = ({ target: { value } }: BaseSyntheticEvent) => {
    setSearchValue(value);
  };
  const onFinishGitHubForm = useCallback(() => {
    loadRepositories();
  }, [loadRepositories]);

  return (
    <div className="list-repository-page">
      {error && <Alert message={error.message} type="error" showIcon closeIcon />}

      <h2>GITHUB REPOSITORIES</h2>

      {/* GitHub User Info */}
      <Divider orientation="left">
        <h3>User Infomation</h3>
      </Divider>
      <GitHubUserForm onFinishForm={onFinishGitHubForm} />

      {/* Table */}
      <Divider orientation="left">
        <h3>List Repository</h3>
      </Divider>
      <Search onChange={onChangeSearch} className="search-field" size="large" placeholder="Search repository" />
      <Table
        columns={REPOSITORY_COLUMNS}
        dataSource={filteredRepositories}
        loading={called && loading}
        className="list-repository-table"
      />
    </div>
  );
};
