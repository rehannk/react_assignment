import React from 'react'
import {
    Redirect,
  } from "react-router-dom";

function AppLogout() {
    localStorage.clear();
    return <Redirect to="/login" />
}

export default AppLogout