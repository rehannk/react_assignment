import { useHistory } from 'react-router-dom';
import { Form, Input, Button, Radio, notification } from "antd";
import axios from "axios";
import { UserOutlined, LockOutlined, SmileOutlined } from "@ant-design/icons";


function AppLogin() {
  const history = useHistory();
  const openNotification = (title, desc) => {
    notification.open({
      message: title,
      description: desc,
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  }

  const onFinish = async (values) => {
    // console.log("Success:", values);
    const res = await axios.get(`http://localhost:3003/${values.userType}`);
    if(res.data.length>0){
      let isLogin=false;
      res.data.forEach(element => {
        if(element.email === values.email && element.password === values.password){
          isLogin=true;
          return true;
        }
      });
      if(isLogin){
        localStorage.setItem('login',JSON.stringify(values));
        if(values.userType === "doctor"){
          history.push("/dashboard/doctor");
          openNotification('Successfully','Welcome doctor to in our portal');
        }
        else {
          history.push("/dashboard/patient");
          openNotification('Successfully','Welcome to in our portal');
        }
      }
      else {
        openNotification('Login Alert','Please enter valid credientials');  
      }
    }
    else{
      openNotification('Sorry....','No records available in the syatem'); 
    }  
  };

  return (
    <div id="login" className="block loginBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Get in Our Portal</h2>
          <p>Bringing The Future of Healthcare</p>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="userType"
            rules={[
              {
                required: true,
                message: "Please select User type",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="doctor">Doctor</Radio>
              <Radio value="patient">Patient</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AppLogin;
