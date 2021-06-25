import { useState, useEffect } from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import AddContact from "./component/AddContact";
import UpdateContact from "./component/UpdateContact";
import ContactList from "./component/ContactList";
import ContactDetails from "./component/ContactDetails";
import Header from "./component/Header";

function App() {
  const [contacts, setContacts] = useState([]);

  // console.log(contacts);

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem("allContacts"));
    if (retriveContacts) setContacts(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem("allContacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={contacts}
                setContacts={setContacts}
              />
            )}
          />

          <Route
            path="/add"
            exact
            render={(props) => (
              <AddContact
                {...props}
                contacts={contacts}
                setContacts={setContacts}
              />
            )}
          />
          <Route path="/contactdetails/:name" component={ContactDetails} />

          <Route
            path="/update"
            exact
            render={(props) => (
              <UpdateContact
                {...props}
                contacts={contacts}
                setContacts={setContacts}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
