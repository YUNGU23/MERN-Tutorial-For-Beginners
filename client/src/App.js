import './App.css';
import { useEffect, useState} from "react";             // import userEffect and useState from react
import Axios from "axios";                              // import Axios from axios

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);   // initialize listOfUsers, setListOfUsers with empty list
  const [name, setName] = useState("");                 // initialize name and setName with empty string
  const [age, setAge] = useState(0);                    // initialize age and setAge with 0
  const [username, setUsername] = useState("");         // initialize username and setUsername with empty string

  useEffect(() => {                                     // from database get users and give it to setlistOfUsers
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
}, []);

  const createUser = () => {                            //  store input data to users and then give it to setlistofusers
    Axios.post("http://localhost:3001/createUser",{
      name: name, 
      age: age, 
      username: username,
    }).then((response) => {
      setListOfUsers([
        ...listOfUsers,
        {
          name,
          age,
          username,
        },
      ]);
    });
  };
  return (
    <div className="App">
    <div className='usersDisplay'>
      {listOfUsers.map((user) => {                      //  define the format of listofusers
        return (
          <div>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <h1>Username: {user.username}</h1>
          </div>
        );
      })}
      </div>  
      <div>
        <input                                          // add input menue and button to store it to database
        type = "text" 
        placeholder = "Name..." 
        onChange={(event) => {
          setName(event.target.value);
          }}
          />
        <input 
        type = "number" 
        placeholder = "Age..." 
        onChange={(event) => {
          setAge(event.target.value);
          }}
        />
        <input 
        type = "text" 
        placeholder = "username..." 
        onChange={(event) => {
          setUsername(event.target.value);
          }}
        />
        <button onClick={createUser}> Create User</button>    // store to createUser
        </div>  
    </div>
  );
}

export default App;
