import { ColumnsType } from "antd/es/table";
import { Repository } from "../../typings/repository";
import { PiForkKnifeFill, PiStarDuotone } from "react-icons/pi";

export const REPOSITORY_COLUMNS: ColumnsType<Repository> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (_, { name, url }) => (
      <a href={url} target="blank">
        {name}
      </a>
    ),
  },
  {
    title: "Projects Resource Path",
    dataIndex: "projectsUrl",
    key: "projectsUrl",
    align: "center",
    render: (_, { projectsUrl }) => (
      <a href={projectsUrl} target="blank">
        {projectsUrl}
      </a>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    align: "center",
    render: (text) => <>{text}</>,
  },
  {
    title: "Stars",
    dataIndex: "stars",
    key: "stars",
    align: "center",
    render: (_, { stargazerCount }) => (
      <>
        <PiStarDuotone color="#FF9529" style={{ marginRight: "8px" }} size={15} /> {stargazerCount || 0}
      </>
    ),
  },
  {
    title: "Forks",
    dataIndex: "forks",
    key: "forks",
    align: "center",
    render: (_, { forkCount }) => (
      <>
        <PiForkKnifeFill color="#FF9529" style={{ marginRight: "8px" }} size={18} />
        {forkCount}
      </>
    ),
  },
];
