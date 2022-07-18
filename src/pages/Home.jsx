import { useParams } from "react-router";

/** components */
import { Header } from "../components/Header";
import { Dashboard } from "../pages/Dashboard";

/** styles */
import "../styles/dashboard.css";


export function Home() {
  let { id } = useParams();
  let userId = parseInt(id);

  return (
    <div>
      <Header />
      <Dashboard userId={userId}/>
    </div>
  );
}

