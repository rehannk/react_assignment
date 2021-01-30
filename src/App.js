import React from 'react';
import './App.css';
import 'antd/dist/antd.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import AppHeader from './components/common/header';
import AppHero from './components/home/hero';
import AppAbout from './components/home/about';
import AppLogin from './components/home/Credientials/login';
import AppLogout from './components/home/Credientials/logout';
import DoctorDashboard from './components/home/Dashboard/Doctor/doctors-dashboard';
import AddPatient from './components/home/Patient/addPatient';
import PatientChangePassword from './components/home/Patient/changePassword';
import PatientDashboard from './components/home/Dashboard/Patient/patient-dashboard';
import NotFound from './components/home/notFound';

import { Layout } from 'antd';
const { Header, Content } = Layout;

function App() {
  return (
<Router>
    <Layout className="mainLayout">
      <Header>
        <AppHeader/>
      </Header>
      <Content>
      <Switch>
          <Route exact path="/" component={AppHero} />
          <Route exact path="/about" component={AppAbout} />
          <Route exact path="/login" component={AppLogin} />
          <Route exact path="/logout" component={AppLogout} />
          <Route exact path="/dashboard/doctor" component={DoctorDashboard} />
          <Route exact path="/dashboard/patient" component={PatientDashboard} />
          <Route exact path="/dashboard/doctor/add" component={AddPatient} />
          <Route exact path="/dashboard/patient/change-password" component={PatientChangePassword} />  
          <Route component={NotFound} />
          
        </Switch>
      </Content> 
    </Layout>
    </Router>
  );
}

export default App;
