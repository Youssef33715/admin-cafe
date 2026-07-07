import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import api from '../api/axiosConfig';

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [showModal, setShowModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/v1/categories');
      setCategories(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load categories. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      setSubmitLoading(true);
      await api.post('/api/v1/categories', { name: newCategoryName });
      setNewCategoryName('');
      setShowModal(false);
      fetchCategories(); // Refresh list
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to add category');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    try {
      await api.delete(`/api/v1/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert('Failed to delete category');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-cafe-primary fw-bold mb-0">Category Management</h2>
        <Button variant="primary" className="btn-cafe-primary fw-bold" onClick={() => setShowModal(true)}>
          <FiPlus className="me-2" /> Add Category
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card className="bg-white-card border-0">
        <Card.Body>
          {loading ? (
            <div className="text-center py-5 text-cafe-primary">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : categories.length === 0 ? (
            <p className="text-center text-cafe-muted py-4 mb-0">No categories found. Add one to get started.</p>
          ) : (
            <Table hover className="mb-0 align-middle table-borderless" style={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
              <thead>
                <tr>
                  <th className="border-bottom border-subtle pb-3">#</th>
                  <th className="border-bottom border-subtle pb-3">Name</th>
                  <th className="text-end border-bottom border-subtle pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category._id || index} className="bg-cafe-bg rounded shadow-sm">
                    <td className="py-3 ps-3 rounded-start">{index + 1}</td>
                    <td className="fw-semibold py-3 text-cafe-primary">{category.name}</td>
                    <td className="text-end py-3 pe-3 rounded-end">
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        className="bg-white"
                        onClick={() => handleDeleteCategory(category._id)}
                      >
                        <FiTrash2 />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Add Category Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="bg-white-card text-cafe-main">
        <Modal.Header closeButton className="border-subtle">
          <Modal.Title className="text-cafe-primary fw-bold">Add New Category</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddCategory}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Category Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="e.g. Beverages" 
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                required
                className="bg-white text-cafe-main border-subtle focus-ring-cafe"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-subtle">
            <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="btn-cafe-primary" disabled={submitLoading}>
              {submitLoading ? 'Saving...' : 'Save Category'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManager;
