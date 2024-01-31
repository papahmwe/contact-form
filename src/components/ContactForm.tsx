/* eslint-disable react/jsx-key */
"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("api/contact", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const { msg, success } = await res.json();

      setError(msg);
      setSuccess(success);
      if (success) {
        setName(""), setEmail(""), setMessage("");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex flex-col gap-5 px-32 mx-auto w-[80%] mt-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <h3 className="text-base mt-2 font-medium opacity-90">
            Please fill the form below!
          </h3>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Pa Pa"
            onChange={(e: any) => setName(e.target.value)}
            value={name}
            className="boreder shadow-lg rounded-md p-3 h-14  outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="papahmwe@gamil.com"
            onChange={(e: any) => setEmail(e.target.value)}
            value={email}
            className="boreder rounded-md shadow-lg p-3 h-14 outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            placeholder="Type your message here ..."
            onChange={(e: any) => setMessage(e.target.value)}
            value={message}
            className="h-[150px] border shadow-lg p-3  rounded-md outline-none"
          />
        </div>

        <button className="p-3 w-[100%]  text-white font-semibold text-base bg-green-700 hover:bg-green-800 transition-all duration-200 outline-none rounded-md shadow-lg ">
          Send
        </button>
      </form>

      <div className=" bg-slate-100 rounded-md ">
        {error &&
          error.map((err) => (
            <div
              className={`${
                success ? "text-green-700" : "text-red-700"
              }  text-base font-normal px-3 py-2`}
            >
              {err}
            </div>
          ))}
      </div>
    </div>
  );
}
