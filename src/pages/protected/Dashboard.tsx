import { logout } from "../../utils/auth";

const Dashboard = () => {
  return (
    <>
      <div>Dashboard</div>
      <button onClick={() => logout()}>Logout</button>
    </>
  );
};

export default Dashboard;
