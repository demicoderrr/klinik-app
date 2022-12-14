import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { login } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPwd, setShowPwd] = useState(false);
  const [isError, setIsError] = useState({
    general: false,
    authorized: false,
    username: false,
    password: false,
  });
  const [errorMsg, setErrorMsg] = useState("");

  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
    if (inputValues) {
      setIsError({ general: false });
      setErrorMsg("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValues.username.length < 1) {
      setIsError({ ...isError, username: true, general: true });
      setErrorMsg("Harap isi field");
    } else if (
      inputValues.username !== "admin" ||
      inputValues.password !== "admin123"
    ) {
      setIsError({ ...isError, authorized: true, general: true });
      setErrorMsg("Username/ password tidak terdaftar");
    } else {
      dispatch(login());
      setErrorMsg("");
      navigate("/home");
    }
    e.target.reset();
  };

  return (
    <div className="flex flex-col sm:mx-32 md:mx-32 min-[800px]:mx-32 lg:mx-96">
      <h1 className="text-center font-Inter font-extrabold text-3xl">Login</h1>

      <form onSubmit={handleSubmit}>
        <div id="form-input-area" className="flex flex-col pt-3">
          <label
            htmlFor="username"
            className="block mb-1 font-Inter font-semibold text-gray-900"
          >
            Username
          </label>
          <input
            name="username"
            className={`appearance-none border ${
              isError.general && `border-red-500`
            } border-gray-300 py-2 px-3 rounded-full text-gray-900 leading-none relative`}
            type="text"
            onChange={handleChange}
          />
          {isError ? (
            <div className="text-red-500 text-sm pt-2">{errorMsg}</div>
          ) : null}

          <div className="flex flex-col pt-5 relative">
            <label
              htmlFor="password"
              className="block mb-1 font-Inter font-semibold text-gray-900"
            >
              Password
            </label>
            <input
              name="password"
              className={`appearance-none border ${
                isError.general && `border-red-500`
              } border-gray-300 py-2 px-3 rounded-full text-gray-900 leading-none`}
              type={showPwd ? `text` : `password`}
              onChange={handleChange}
            />
            <div
              onClick={() => {
                setShowPwd(!showPwd);
              }}
              className="flex align-middle absolute cursor-pointer top-12 pt-2 right-4"
            >
              {showPwd ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>

            {isError ? (
              <div className="text-red-500 text-sm pt-2">{errorMsg}</div>
            ) : null}
          </div>

          <div id="button-area" className="pt-3 mt-8">
            <button
              type="submit"
              className="bg-sky-500 hover:bg-sky-300 text-white text-sm font-medium py-2 px-4 rounded-full w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transition-none disabled:transform-none"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
