import { Outlet } from "react-router-dom";
import NavigationMenuItems  from "./components/navbar";
const Layout = () => {
  return (
    <>
      <NavigationMenuItems />
      <Outlet />
    </>
  );
};

export default Layout;
