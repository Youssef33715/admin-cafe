import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FiUsers, FiDollarSign, FiShoppingBag, FiStar } from 'react-icons/fi';

const DashboardOverview = () => {
  return (
    <div>
      <h2 className="mb-4 text-cafe-primary fw-bold">Dashboard Overview</h2>
      
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="bg-white-card border-0 h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="bg-cafe-bg p-3 rounded-circle me-3 d-flex align-items-center justify-content-center border border-subtle">
                <FiDollarSign size={24} className="text-cafe-primary" />
              </div>
              <div>
                <h6 className="text-cafe-muted mb-1 fw-medium">Total Revenue</h6>
                <h4 className="text-cafe-primary mb-0 fw-bold">$12,450.00</h4>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="bg-white-card border-0 h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="bg-cafe-bg p-3 rounded-circle me-3 d-flex align-items-center justify-content-center border border-subtle">
                <FiShoppingBag size={24} className="text-cafe-primary" />
              </div>
              <div>
                <h6 className="text-cafe-muted mb-1 fw-medium">Total Orders</h6>
                <h4 className="text-cafe-primary mb-0 fw-bold">1,245</h4>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="bg-white-card border-0 h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="bg-cafe-bg p-3 rounded-circle me-3 d-flex align-items-center justify-content-center border border-subtle">
                <FiUsers size={24} className="text-cafe-primary" />
              </div>
              <div>
                <h6 className="text-cafe-muted mb-1 fw-medium">Active Customers</h6>
                <h4 className="text-cafe-primary mb-0 fw-bold">842</h4>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="bg-white-card border-0 h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="bg-cafe-bg p-3 rounded-circle me-3 d-flex align-items-center justify-content-center border border-subtle">
                <FiStar size={24} className="text-cafe-primary" />
              </div>
              <div>
                <h6 className="text-cafe-muted mb-1 fw-medium">Popular Items</h6>
                <h4 className="text-cafe-primary mb-0 fw-bold">24</h4>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card className="bg-white-card border-0 mb-4">
            <Card.Header className="border-subtle bg-transparent text-cafe-primary fw-bold py-3">Recent Activity</Card.Header>
            <Card.Body>
              <p className="text-cafe-muted text-center py-5">Activity charts will be displayed here.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="bg-white-card border-0 mb-4">
            <Card.Header className="border-subtle bg-transparent text-cafe-primary fw-bold py-3">Quick Actions</Card.Header>
            <Card.Body>
              <p className="text-cafe-muted text-center py-5">Quick links to add items will be displayed here.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardOverview;
