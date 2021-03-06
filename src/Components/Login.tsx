import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { gql } from "@apollo/client";
import { client } from "../index";

const Login: React.FC = () => {
  const history = useHistory();

  const inputStyle = "border-2 border-gray-200 w-60 rounded-md pl-1";
  const errorStyle = "text-red-500 text-sm";

  const validationSchema = yup.object().shape({
    username: yup.string().required("*username required"),
    password: yup.string().required("*password required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validationSchema),
    defaultValues: { username: "", password: "" },
  });

  // graphql mutation
  const LOGIN = gql`
    mutation LoginMutation($loginUsername: String!, $loginPassword: String!) {
      login(username: $loginUsername, password: $loginPassword) {
        user {
          _id
          username
          email
        }
        token
      }
    }
  `;

  const Submit = (credentials: { username: string; password: string }) => {
    client
      .mutate({
        variables: {
          loginUsername: credentials.username,
          loginPassword: credentials.password,
        },
        mutation: LOGIN,
      })
      .then((res) => {
        localStorage.setItem("authToken", res.data.login.token);
        history.push("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="flex flex-col h-screen max-h-screen items-center justify-center">
      <h1 className="text-white font-lobster text-4xl border-purple-700 bg-purple-700 border-2 w-80 text-center rounded-t-md">
        Meet
      </h1>
      <form
        className="h-auto flex flex-col justify-between border-l-2 border-r-2 border-b-2 items-center w-80 rounded-b-md pt-3"
        onSubmit={handleSubmit(Submit)}
      >
        <div className="mb-4">
          <input
            className={inputStyle}
            contentEditable="true"
            placeholder="username"
            {...register("username", {
              required: "username required",
            })}
          />
          {errors.username && (
            <p className={errorStyle}>{errors.username.message}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            className={inputStyle}
            type="password"
            contentEditable="true"
            placeholder="password"
            {...register("password", {
              required: "username is required",
            })}
          />
          {errors.password && (
            <p className={errorStyle}>{errors.password.message}</p>
          )}
        </div>
        <button className="bg-blue-400 w-60 rounded-md mb-1" type="submit">
          Login
        </button>
      </form>
      <div>
        <p>
          Not a member?{" "}
          <Link className="underline" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
