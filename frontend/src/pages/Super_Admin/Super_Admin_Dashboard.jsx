import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';
import UserFormModal from '../../components/UserFormModal';
import { get_All_User_detail } from '../../services/super_admin_Services';
import { useNavigate } from 'react-router-dom';


const Super_Admin_Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  const initialFormData = {
    employeeName: '',
    department: '',
    email: '',
    leavesGranted: '',
    designation: '',
    username: '',
    role: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await get_All_User_detail();
      console.log(res);
      setUsers(res);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleShowAdd = () => {
    setEditingUser(null);
    setFormData(initialFormData);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ ...user });
    setShowModal(true);
  };

  const handleDelete = async (username) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${username}`);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingUser) {
        await axios.put(`http://localhost:5000/api/users/${editingUser.username}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/users', formData);
      }
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mt-4">
      <h2>Super Admin Dashboard</h2>
      <div>
      <Button variant="primary" onClick={handleShowAdd}>
        Add User
      </Button>
      <Button variant="secondary" className="ms-2" onClick={() => navigate('/modify-department')}>
      Modify Departments
    </Button>
    <Button
  variant="secondary"
  className="ms-2"
  onClick={() => navigate('/modify-designation')}
>
  Modify Designation
</Button>

</div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Leaves</th>
            <th>Designation</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.Username}>
              <td>{user.Emp_Name}</td>
              <td>{user.Dept_Name}</td>
              <td>{user.Email}</td>
              <td>{user.Casual_Leaves_Granted}</td>
              <td>{user.Designation_Name}</td>
              <td>{user.Username}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(user)}>
                  Modify
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(user.Username)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <UserFormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={handleFormSubmit}
        formData={formData}
        handleChange={handleChange}
        isEditing={!!editingUser}
      />
    </div>
  );
};

export default Super_Admin_Dashboard;
