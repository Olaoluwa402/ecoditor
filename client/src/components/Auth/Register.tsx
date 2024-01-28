import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../reduxToolKit/store";
import {
  createUserAction,
  clearErrorRegister,
  resetRegister,
} from "../../reduxToolKit/features/auth";
import Spinner from "../Spinner/Spinner.tsx";
import useValidateInputs from "../../Hooks/useValidateInput.ts";
import { toast } from "react-toastify";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector(
    (store: RootState) => store.createdUser
  );

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (success) {
      toast.success("registration successful");
      dispatch(resetRegister());
      navigate("/login");
    }
    if (error) {
      setTimeout(() => {
        dispatch(clearErrorRegister());
      }, 6000);
    }
  }, [success, error]);

  const submitHandler = () => {
    console.log("clicked");
    const { status, newErrors } = useValidateInputs({
      email,
      password,
      username,
    });
    if (!status) {
      toast.warning("all fields are required");
      setErrors(newErrors);
      setTimeout(() => {
        setErrors({});
      }, 4000);
      return;
    }
    dispatch(createUserAction({ email, password, username }));
    setEmail("");
    setPassword("");
    setUsername("");
  };
  return (
    <div>
      <div className="flex w-screen flex-wrap text-slate-800">
        <div className="relative hidden h-screen select-none flex-col justify-center bg-blue-600 text-center md:flex md:w-1/2">
          <div className="mx-auto py-16 px-8 text-white xl:w-[40rem]">
            <span className="rounded-full bg-white px-3 py-1 font-medium text-blue-600">
              New Feature
            </span>
            <p className="my-6 text-3xl font-semibold leading-10">
              Write codes with{" "}
              <span className="mx-auto block w-56 whitespace-nowrap rounded-lg bg-orange-400 py-2 text-white">
                eCoditor
              </span>
            </p>
            <p className="mb-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt
              necessitatibus nostrum repellendus ab totam.
            </p>
            <a
              href="#"
              className="font-semibold tracking-wide text-white underline underline-offset-4"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="flex w-full flex-col md:w-1/2">
          <div className="flex justify-center pt-12 md:justify-start md:pl-12">
            <a href="#" className="text-2xl font-bold text-blue-600">
              {" "}
              eCODITOR .{" "}
            </a>
          </div>
          <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
            <p className="text-center text-3xl font-bold md:text-left md:leading-tight">
              Create your free account
            </p>
            <p className="mt-6 text-center font-medium md:text-left">
              Already using eCoditor?
              <Link
                to="/login"
                className="whitespace-nowrap font-semibold text-blue-700"
              >
                Login here
              </Link>
            </p>
            <button className="-2 mt-8 flex items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition hover:border-transparent hover:bg-black hover:text-white focus:ring-2">
              <img
                className="mr-2 h-5"
                src="/images/-9jfz8JJkYKu0yDYmD5WM.svg"
                alt=""
              />{" "}
              Get started with Google
            </button>
            <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
              <div className="absolute left-1/2 h-6 -translate-x-1/2 bg-white px-4 text-center text-sm text-gray-500">
                Or use email instead
              </div>
            </div>
            <div className="flex flex-col items-stretch pt-3 md:pt-8">
              <div className="flex flex-col pt-4">
                {errors.username && (
                  <p className="text-red-400">{errors.username}</p>
                )}
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="text"
                    id="login-name"
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col pt-4">
                {errors.email && <p className="text-red-400">{errors.email}</p>}
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="email"
                    id="login-email"
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4 flex flex-col pt-4">
                {errors.password && (
                  <p className="text-red-400">{errors.password}</p>
                )}
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input
                    type="password"
                    id="login-password"
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Password (minimum 8 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              {loading ? (
                <Spinner />
              ) : (
                <button
                  onClick={submitHandler}
                  type="button"
                  className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-center text-base font-semibold text-white shadow-md outline-none ring-blue-500 ring-offset-2 transition hover:bg-blue-700 focus:ring-2 md:w-32"
                >
                  Sign up
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
