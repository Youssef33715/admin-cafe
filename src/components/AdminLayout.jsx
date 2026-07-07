import React, { useContext } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { FiHome, FiList, FiCoffee, FiLogOut } from 'react-icons/fi';

const AdminLayout = () => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="d-flex vh-100 bg-light-theme text-cafe-main">
      {/* Sidebar */}
      <div className="sidebar bg-white-card p-3 d-flex flex-column border-end border-subtle z-3" style={{ width: '250px' }}>
        <h3 className="text-cafe-primary mb-4 fw-bold">Cafe Admin</h3>
        <Nav className="flex-column mb-auto">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link mb-2 text-cafe-main fw-medium ${isActive ? 'active bg-cafe-bg text-cafe-primary border border-subtle shadow-sm' : ''}`
            }
            style={{ borderRadius: '8px', padding: '10px 15px' }}
          >
            <FiHome className="me-2 mb-1" /> Dashboard
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `nav-link mb-2 text-cafe-main fw-medium ${isActive ? 'active bg-cafe-bg text-cafe-primary border border-subtle shadow-sm' : ''}`
            }
            style={{ borderRadius: '8px', padding: '10px 15px' }}
          >
            <FiList className="me-2 mb-1" /> Categories
          </NavLink>
          <NavLink
            to="/menu-items"
            className={({ isActive }) =>
              `nav-link mb-2 text-cafe-main fw-medium ${isActive ? 'active bg-cafe-bg text-cafe-primary border border-subtle shadow-sm' : ''}`
            }
            style={{ borderRadius: '8px', padding: '10px 15px' }}
          >
            <FiCoffee className="me-2 mb-1" /> Menu Items
          </NavLink>
        </Nav>
        <hr className="border-subtle" />
        <div className="user-info mb-3">
          <small className="text-cafe-muted d-block">Logged in as:</small>
          <span className="fw-semibold text-cafe-primary">{user?.name || 'Admin User'}</span>
        </div>
        <Button variant="outline-danger" onClick={handleLogout} className="w-100 d-flex align-items-center justify-content-center border-subtle text-danger bg-white">
          <FiLogOut className="me-2" /> Logout
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 d-flex flex-column overflow-hidden">
        <Navbar className="bg-white-card border-bottom border-subtle px-4 py-3 z-2">
          <Navbar.Brand className="text-cafe-primary fw-bold">Admin Portal</Navbar.Brand>
        </Navbar>
        
        <main className="p-4 overflow-auto flex-grow-1 bg-light-theme">
          <Container fluid className="px-0">
            <Outlet />
          </Container>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
