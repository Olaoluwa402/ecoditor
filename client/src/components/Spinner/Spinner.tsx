import React from "react";

import styled from "./Spinner.module.css";

const Spinner: React.FC = () => (
  <div className={styled.spinner}>
    <div className={styled.ldsdualRing}></div>
  </div>
);

export default Spinner;
