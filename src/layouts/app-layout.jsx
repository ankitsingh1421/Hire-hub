import Header from "@/components/header";
import { Link, Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10">
        Made with 💗 by <Link to="https://github.com/ankitsingh1421">Ankit Singh </Link>
      </div>
    </div>
  );
};

export default AppLayout;
