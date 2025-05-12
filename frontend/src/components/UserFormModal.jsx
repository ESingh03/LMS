import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UserFormModal = ({
  show,
  onHide,
  onSubmit,
  formData,
  handleChange,
  isEditing
}) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Edit User' : 'Add User'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Employee Name</Form.Label>
            <Form.Control
              name="employeeName"
              type="text"
              required
              value={formData.Emp_Name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Control
              name="department"
              type="text"
              required
              value={formData.Dept_Name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              required
              value={formData.Email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Leaves Granted</Form.Label>
            <Form.Control
              name="leavesGranted"
              type="number"
              required
              value={formData.Casual_Leaves_Granted}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              name="designation"
              type="text"
              required
              value={formData.Designation_Name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              required
              value={formData.Username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              required
              value={formData.Password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              name="role"
              type="text"
              required
              value={formData.role}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="success">
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UserFormModal;
