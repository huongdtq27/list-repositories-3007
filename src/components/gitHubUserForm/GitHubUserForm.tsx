import { Button, Form, Input } from "antd";
import { PiWarningFill } from "react-icons/pi";

import "./GitHubUserForm.scss";
import { DEFAULT_GIHUB_LOGIN_USER, DEFAULT_GITHUB_ACCESS_TOKEN } from "../../config";

export const GitHubUserForm = ({ onFinishForm }: { onFinishForm: Function }) => {
  const [form] = Form.useForm();

  const onFinish = ({ user, accessToken }: { user: string; accessToken: string }) => {
    localStorage.setItem("token", accessToken || DEFAULT_GITHUB_ACCESS_TOKEN);
    localStorage.setItem("gitHubUser", user || DEFAULT_GIHUB_LOGIN_USER);
    onFinishForm();
  };

  return (
    <>
      <p style={{ color: "#FF9529" }}>
        <PiWarningFill style={{ marginRight: "8px" }} size={15} /> Please provide Github Login and{" "}
        <a
          style={{ color: "#f57c00" }}
          href="https://docs.github.com/en/enterprise-server@3.6/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens"
          target="_blank"
          rel="noreferrer"
        >
          <i>Github Access Token</i>
        </a>{" "}
        to get repositories!
      </p>

      <Form className="gitHub-form" form={form} onFinish={onFinish}>
        <Form.Item className="form-item-login" name="user" label="Github Login Name">
          <Input className="gitHub-form-input" size="large" placeholder="Enter GitHub login name" />
        </Form.Item>
        <Form.Item className="form-item-token" name="accessToken" label="Github Access Token">
          <Input.Password className="gitHub-form-input" size="large" placeholder="Enter GitHub access token" />
        </Form.Item>
        <Form.Item className="form-item-button">
          <Button type="primary" htmlType="submit" style={{ backgroundColor: "#20b2aa" }}>
            OK
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
