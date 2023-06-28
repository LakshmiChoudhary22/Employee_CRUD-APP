import React, { useContext, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { adddata } from "../context/ContextProvider";

export default function CreateEmployee() {
  const navigate = useNavigate();
  const { udata, setUdata } = useContext(adddata);
  const [inputvalue, setInput] = useState({
    name: "",
    email: "",
    phone: "",
  });

  console.log({ inputvalue });

  const setData = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setInput((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const addinpdata = async (e) => {
    e.preventDefault();

    const { name, email, phone } = inputvalue;

    const res = await fetch("http://localhost:5000/employee/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
      alert("error");
    } else {
      navigate("/");
      setUdata(data);
      console.log("data added");
    }
  };

  return (
    <div className="container">
      <NavLink to="/" className="btn btn-success my-2">
        Home
      </NavLink>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputText1" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={inputvalue.name}
            onChange={setData}
            className="form-control"
            id="exampleInputText1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={inputvalue.email}
            onChange={setData}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPhone1" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={inputvalue.phone}
            onChange={setData}
            className="form-control"
            id="exampleInputPhone1"
          />
        </div>

        <button type="submit" onClick={addinpdata} className="btn btn-primary">
          Create{" "}
        </button>
      </form>
    </div>
  );
}
