import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";

import Chat from "./chat/Chat";
import "./main.css";

const App = () => {
  return (
    <Suspense fallback={<div>Loading... </div>}>
      <RecoilRoot>
        <Chat />
      </RecoilRoot>
    </Suspense>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
