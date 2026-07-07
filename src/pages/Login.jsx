import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { FiCoffee } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light-theme text-cafe-main">
      <Container className="d-flex justify-content-center">
        <Card className="bg-white-card border-0" style={{ width: '400px', borderRadius: '15px' }}>
          <Card.Body className="p-5">
            <div className="text-center mb-4">
              <div className="bg-cafe-primary d-inline-flex justify-content-center align-items-center rounded-circle mb-3 shadow-sm" style={{ width: '60px', height: '60px' }}>
                <FiCoffee size={30} className="text-white" />
              </div>
              <h3 className="fw-bold text-cafe-primary">Admin Portal</h3>
              <p className="text-cafe-muted">Sign in to manage your cafe</p>
            </div>

            {error && <Alert variant="danger" className="text-center">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-cafe-main fw-medium">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white text-cafe-main border-subtle focus-ring-cafe"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label className="text-cafe-main fw-medium">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white text-cafe-main border-subtle focus-ring-cafe"
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100 fw-bold btn-cafe-primary py-2"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
