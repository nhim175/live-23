import { useEffect, useState } from "react";
import "./App.css";
import { UserListItem } from "./components";

function App() {
  const [location, setLocation] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        const { latitude, longitude } = data.coords;
        setLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  useEffect(() => {
    if (!location) return;
    async function fetchUsers() {
      const users = await fetch(
        `http://localhost:3001/users?lat=${location.lat}&lng=${location.lng}`
      ).then((res) => res.json());
      setUsers(users);
    }
    fetchUsers();
  }, [location]);

  return (
    <div className="App">
      {users.map((user) => (
        <UserListItem user={user} />
      ))}
    </div>
  );
}

export default App;
