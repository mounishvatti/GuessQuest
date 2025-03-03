import { Outlet } from "react-router-dom";
import Footer from "./components/footer";
import NavigationMenuItems  from "./components/navbar";
const Layout = () => {
  return (
    <>
      <NavigationMenuItems />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
