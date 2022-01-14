import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import { useEffect, useState } from 'react';
import { AuthService } from './service/AuthService';
import { UserService } from './service/UserService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import React from 'react';
import { useCookies } from 'react-cookie';


function App() {

  const [users, setUsers] = useState([]);
  const [cookies, setCookie] = useCookies(['token']);
  

  useEffect(() => {
    getToken();
    //setInterval(getUsers, 1000);
  });

  const getToken = (callback) => {
    let token = getCookie('token');
    if (token && callback) {
      callback();
    } else {
      let authService = new AuthService();
      authService.makeAuth({
        "username" : "test",
        "password": "test"
      }).then(res => {
        setCookie('token', res.token, {maxAge: res.expiresIn});
        if (callback){
            callback();
        }
      });
    }
    
  }

  const getUsers = () => {
    getToken(() => {
      let token = getCookie('token');
      let userService = new UserService(token);
      userService.getUsers().then(res => {
        setUsers(res.data);
      });
    });
    
  }

  function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");
    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    } 
    // Return null if not found
    return null;
}

  return (
    <div style={{width:'80%', margin: '0 auto', marginTop: '20px'}}>
      <Panel header="React CRUD App">
        <DataTable value={users} selectionMode="single"
                     dataKey="id"
                     className="p-datatable-gridlines">
            <Column field="id" header="ID"></Column>
            <Column field="username" header="Username"></Column>
            <Column field="firstName" header="Nombre"></Column>
            <Column field="lastName" header="Apellido"></Column>
        </DataTable>
      </Panel>
    </div>
  );
}

export default App;
