import { createContext, useState } from "react";

const RenderCheck = createContext();

const RenderCheckProvider = ({ children }) => {
  const [isRendered, setRender] = useState(false);
  return (
    <RenderCheck.Provider value={{ isRendered, setRender }}>
      {children}
    </RenderCheck.Provider>
  );
};

export { RenderCheck, RenderCheckProvider };
