import React from 'react'
import { useHistory} from 'react-router-dom';
import { Form, Input, Button, notification } from "antd";
import axios from "axios";
import { LockOutlined, SmileOutlined  } from "@ant-design/icons";

function PatientChangePassword() {

    const history = useHistory();

  if (!localStorage.getItem("login")){
    history.push("/login");
  }
  
  const openNotification = (title, desc) => {
    notification.open({
      message: title,
      description: desc,
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  }

  const onFinish = async (values) => {
    
    var patientData = JSON.parse(localStorage.getItem("login"));
    const res = await axios.get(`http://localhost:3003/patient`);
    if(res.data.length>0){
        let isLogin=false;
        let id=-1;
        let patientDetails = null;
        res.data.forEach(element => {
          if(element.email === patientData.email && element.password === values.oldPassword){
            isLogin=true;
            id=element.id;
            patientDetails = element;
            return true;
          }
        });
        
        if(isLogin){
          if(values.oldPassword !== values.newPassword){
            patientDetails.password = values.newPassword;
            await axios.put(`http://localhost:3003/patient/${id}`, patientDetails);
            history.push("/login");
            openNotification('Successfully','Please Login Again');
            localStorage.clear();
          }
          else {
            openNotification('Password Alert','New password cannot be same as Old password');
          }
        }
        else {
          openNotification('Password Alert','Old password is in correct');  
        }
      }
      else{
        openNotification('Sorry....','No Patient Available in the syatem'); 
      }
  };


    return (
        <div id="login" className="block loginBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Change Your Paasword</h2>
          <p>Dolore nam rerum obcaecati fugit odio nobis Molestiae rerum</p>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          
          <Form.Item
            name="oldPassword"
            rules={[{ required: true, message: "Please input your Old Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Old Password"
            />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[
              { 
                required: true, 
                message: "Please input your New Password!" 
              },
              {
                pattern: /^.{8,}$/,
                message: "Password should be mimimum 8 character long"
              },
              {
                pattern: /[a-z]/,
                message: "Password should have at least 1 small alphabet"
              },
              {
                pattern: /[A-Z]/,
                message: "Password should have at least 1 capital alphabet"
              },
              {
                pattern: /[0-9]/,
                message: "Password should have at least 1 number"
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="New Password"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Save
          </Button>
        </Form>
      </div>
    </div>
    )
}

export default PatientChangePassword;