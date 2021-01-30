import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Button, Card } from "antd";
import { List, Divider } from "antd";


function PatientDashboard() {
  let history = useHistory();

  if (!localStorage.getItem("login")){
    history.push("/login");
  }
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    diagnosis: "",
    prescribed_medication: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  
  useEffect(() => {
    loadUsers();
  }, []);

  var patientData = JSON.parse(localStorage.getItem("login"));

  const loadUsers = async () => {
    await axios.get("http://localhost:3003/patient").then(result =>{
    result.data.forEach((element) => {
      if (element.email === patientData.email) {
        let item = {};
        item["id"] = element.id;
        item["email"] = element.email;
        item["password"] = element.password;
        item["firstName"] = element.firstName;
        item["lastName"] = element.lastName;
        item["phone"] = element.phone;
        item["address"] = element.address;
        item["city"] = element.city;
        item["state"] = element.state;
        item["country"] = element.country;
        item["pincode"] = element.pincode;
        let diagnosis = "";
        let prescribed_medication = "";
        element.diagnosis.forEach(value => {
          diagnosis += diagnosis === "" ? value : ", " + value;
        });
        element.prescribed_medication.forEach(value => {
          prescribed_medication += prescribed_medication === "" ? value : ", " + value;
        });
        item["diagnosis"] = diagnosis;
        item["prescribed_medication"] = prescribed_medication;
        setUser(item);
        return true;
      }
    });
  });
    }

  var data = [
    {

    
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      diagnosis: user.diagnosis,
      prescribed_medication:user.prescribed_medication,
      address: user.address,
      city: user.city,
      state: user.state,
      country:user.country,
      pincode: user.pincode,
    }
  ];

  return (
    <div id="contact" className="block contactBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Welcome to Our Portal</h2>
          <p>Dolore nam rerum obcaecati fugit odio nobis Molestiae rerum</p>
        </div>
        <Button type="primary" href="/dashboard/patient/change-password" className="add-patient" size="large"><i className="fas fa-key" style={{ marginRight:'8px' }}></i>Change Password</Button>
        <Divider orientation="center">Patient's Details</Divider>
        <List
          size="small"
          header={<div>Hey {user.firstName}, Hope you r doing well. Please contact to your doctor for updating your information.</div>}
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card className="patientCard" title={item.firstName.toUpperCase()}>
                <p>Email      : {item.email}</p>
                <p>First Name : {item.firstName}</p>
                <p>Last Name  : {item.lastName}</p>
                <p>Phone      : {item.phone}</p>
                <p>Diagnosis  : {item.diagnosis}</p>
                <p>Prescribed Medication : {item.prescribed_medication}</p>
                <p>Address    : {item.address}</p>
                <p>City       : {item.city}</p>
                <p>State      : {item.state}</p>
                <p>Country    : {item.country}</p>
                <p>Pincode    : {item.pincode}</p>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
    
  
}

export default PatientDashboard;
