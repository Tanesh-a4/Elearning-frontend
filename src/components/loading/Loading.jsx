import React from "react";
import "./Loading.css";
import { ScatterBoxLoader } from "react-awesome-loaders";

const Loading = () => {
  return (
    <ScatterBoxLoader
    primaryColor={"#6366F1"}
    background={theme.colors["background"]}
  />
  );
};

export default Loading;