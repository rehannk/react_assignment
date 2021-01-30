import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button, Space } from "antd";
import axios from "axios";
const { Search } = Input;


var password="";
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const DoctorDashboard = () => {
  // var password="";
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [editingKey, setEditingKey] = useState("");
  let history = useHistory();
  
  // const searchResult = [];
  if (!localStorage.getItem("login")){
    history.push("/login");
    
  }
  useEffect(() => {
    loadUser();
  }, []);
  

  const getpatient = async () => {
    
    var patientDetails=[]; 
    await axios.get(`http://localhost:3003/patient/`).then(response =>{
      response.data.forEach(element => {
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
          diagnosis += diagnosis === "" ? value : "," + value;
        });
        element.prescribed_medication.forEach(value => {
          prescribed_medication += prescribed_medication === "" ? value : "," + value;
        });
        item["diagnosis"] = diagnosis;
        item["prescribed_medication"] = prescribed_medication;
        password = element.password;
        
        patientDetails.push(item);
        
      });
    });

    return patientDetails;
  }

  const loadUser = async () => {
      getpatient().then(value => {
        setData(value);
      });
  };

  
  const onSearch = async value => {
    value = value.toLowerCase();
    getpatient().then(products => {
      setData(products.filter(product => 
        product.firstName.toLowerCase().includes(value) || 
        product.lastName.toLowerCase().includes(value) || 
        product.diagnosis.toLowerCase().includes(value) || 
        product.prescribed_medication.toLowerCase().includes(value)
        ));
    });
  };

  const isEditing = (record) => record.id === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      diagnosis: "",
      prescribed_medication:"",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:3003/patient/${id}`);
    loadUser();
  };
  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);

      if (index > -1) {
        const element = newData[index];
        
        let item = {
          diagnosis: [],
          prescribed_medication: [],
          password: password
        };
        item.diagnosis = row.diagnosis.split(',');
        item.prescribed_medication = row.prescribed_medication.split(',');
        item["email"] = row.email;
        item["firstName"] = row.firstName;
        item["lastName"] = row.lastName;
        item["phone"] = row.phone;
        item["address"] = row.address;
        item["city"] = row.city;
        item["state"] = row.state;
        item["country"] = row.country;
        item["pincode"] = row.pincode;
        item["password"] = password;

        newData.splice(index, 1, { ...element, ...row });
        setData(newData);

        await axios.put(`http://localhost:3003/patient/${id}`, item);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
      editable: true,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      width: "10%",
      editable: true,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      width: "10%",
      editable: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "10%",
      editable: true,
    },
    {
      title: "Diagnosis",
      dataIndex: "diagnosis",
      width: "10%",
      editable: true,
    },
    {
      title: "Prescribed Medication",
      dataIndex: "prescribed_medication",
      width: "10%",
      editable: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "15%",
      editable: true,
    },
    {
      title: "City",
      dataIndex: "city",
      width: "10%",
      editable: true,
    },
    {
      title: "State",
      dataIndex: "state",
      width: "10%",
      editable: true,
    },
    {
      title: "Country",
      dataIndex: "country",
      width: "10%",
      editable: true,
    },
    {
      title: "Pin Code",
      dataIndex: "pincode",
      width: "10%",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Space direction="horizontal">
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
          <Typography.Link
          onClick={() => deleteUser(record.id)}
          >Delete</Typography.Link>
          </Space>
        )
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <div className="block contactBlock">
      <div className="container-fluid table">
        <div className="titleHolder">
          <h2>Welcome to Our Portal</h2>
          <p>Dolore nam rerum obcaecati fugit odio nobis Molestiae rerum</p>
        </div>
        <div>
        <Search placeholder="Diagnosis, Prescribed Medication and Name" style={{ width: 380 }} allowClear onSearch={onSearch} enterButton />
        <Button type="primary" href="/dashboard/doctor/add" className="add-patient" size="large"><i className="fas fa-user" style={{ marginRight:'8px' }}></i>Add Patient</Button>
        </div>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </div>
    </div>
  );
};

export default DoctorDashboard;
