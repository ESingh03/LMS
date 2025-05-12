import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { fetchDesignationsapi } from '../../services/super_admin_Services';
import axios from 'axios';

const ModifyDesignations = () => {
  const [designations, setDesignations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [newName, setNewName] = useState('');

  const fetchDesignations = async () => {
    try {
      const res = await fetchDesignationsapi();
      setDesignations(res);
    } catch (err) {
      console.error('Failed to fetch designations:', err);
    }
  };

  useEffect(() => {
    fetchDesignations();
  }, []);

  const handleEdit = (designation) => {
    setSelected(designation);
    setNewName(designation.Designation_Name);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/designations/${selected.Designation_ID}`, {
        Designation_Name: newName
      });
      setShowModal(false);
      fetchDesignations();
    } catch (err) {
      console.error('Failed to update designation:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Modify Designations</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Designation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {designations.map((d) => (
            <tr key={d.Designation_ID}>
              <td>{d.Designation_ID}</td>
              <td>{d.Designation_Name}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(d)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Designation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New designation name"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleUpdate}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModifyDesignations;
