import React from "react";

const test = () => {
  return (
    <div>
      <h1>Test</h1>
      <style jsx>
          {`
          h1{
              color: red;
          }
          `}
      </style>
      <button>Click me please!</button>
    </div>
  );
};

export default test;
