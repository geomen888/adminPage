import React, { useState } from 'react';

import Login from "./Login";
import Register from "./Register";

export default () => {
    const [user, setUser] = useState(true);
    return user ? <Register setUser={setUser}/> : <Login setUser={setUser}/>
}