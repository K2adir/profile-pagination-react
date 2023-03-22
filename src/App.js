import "./App.css";
import GetUsers from "./components/GetUsers";
import UserCard from "./components/UserCard";

function App() {
  return (
    <div className="App">
      <h2>App</h2>

      <GetUsers />
      <UserCard />
    </div>
  );
}

export default App;
