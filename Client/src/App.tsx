import { useEffect } from "react";
import MainLayouts from "./components/Layouts/MainLayouts";
import { useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <>
      <MainLayouts />
    </>
  );
}

export default App;
