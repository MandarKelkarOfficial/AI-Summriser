import React from "react";
import logo from "../logo.svg";
import Form from "./Form";
// import SummarizedText from "./SummarizedText";
// import summary from "./SummarizedText"

export default function Landing() {
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className=" mt-5 mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
        <img className="size-12 shrink-0" src={logo} alt="ChitChat Logo" />
        <div>
          <div className="text-xl font-medium text-black dark:text-white ">
            HELLO
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Welcome to the app
          </p>
        </div>
      </div>
      <hr className="border-white justify-content-center mt-5 m-5" />
      <div className="form d-flex justify-content-center align-items-center">
        <Form />
      </div>
      <hr className="border-white justify-content-center mt-5 m-5" />

    </div>
  );
}
