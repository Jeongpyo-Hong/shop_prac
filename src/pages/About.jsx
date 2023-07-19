import React from "react";
import { Outlet } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h4>회사정보</h4>

      {/* Nested routes의 element 보여주는 기능 */}
      <Outlet />
    </div>
  );
};

export default About;
