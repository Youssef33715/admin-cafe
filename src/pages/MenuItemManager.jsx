import { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FiPlus, FiTrash2, FiEdit, FiImage } from "react-icons/fi";
import api from "../api/axiosConfig";

const MenuItemManager = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [itemsRes, categoriesRes] = await Promise.all([
        api.get("/api/v1/menu-items").catch(() => ({ data: { data: [] } })),
        api.get("/api/v1/categories").catch(() => ({ data: { data: [] } })),
      ]);
      setMenuItems(itemsRes.data.data || []);
      setCategories(categoriesRes.data.data || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imageField) => {
    if (!imageField) return null;
    let imagePath =
      typeof imageField === "object" && imageField.url
        ? imageField.url
        : typeof imageField === "string"
          ? imageField
          : null;
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;

    // الحل هنا: بيسحب الرابط من الـ baseURL اللي في axiosConfig
    const baseUrl = api.defaults.baseURL.replace(/\/$/, "");
    return `${baseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleOpenAddModal = () => {
    setEditMode(false);
    setSelectedItemId(null);
    setFormData({ name: "", description: "", price: "", category: "" });
    setImageFile(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (item) => {
    setEditMode(true);
    setSelectedItemId(item._id);
    setFormData({
      name: item.name || "",
      description: item.description || "",
      price: item.price || "",
      category: item.category || "",
    });
    setImageFile(null);
    setShowModal(true);
  };
  //////
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    payload.append("category", formData.category);
    if (imageFile) payload.append("image", imageFile);

    try {
      setSubmitLoading(true);
      // لاحظ: لا يوجد headers هنا
      if (editMode) {
        await api.put(`/api/v1/menu-items/${selectedItemId}`, payload);
      } else {
        await api.post("/api/v1/menu-items", payload);
      }
      setShowModal(false);
      await fetchInitialData(); // لتحديث القائمة بعد الحفظ
      alert("تم الحفظ بنجاح!");
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء الحفظ");
    } finally {
      setSubmitLoading(false);
    }
  };
  /////
  const handleDeleteItem = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/api/v1/menu-items/${id}`);
      setMenuItems(menuItems.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c._id === id);
    return cat ? cat.name : "Unknown";
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-cafe-primary fw-bold mb-0">Menu Items</h2>
        <Button variant="primary" onClick={handleOpenAddModal}>
          <FiPlus className="me-2" /> Add Item
        </Button>
      </div>

      <Card className="border-0">
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          ) : (
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      {item.image ? (
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          style={{
                            width: "48px",
                            height: "48px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      ) : (
                        <div style={{ width: "48px", height: "48px" }}>
                          <FiImage />
                        </div>
                      )}
                    </td>
                    <td>{item.name}</td>
                    <td>{getCategoryName(item.category)}</td>
                    <td>{Number(item.price).toFixed(2)} EGP</td>
                    <td className="text-end">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleOpenEditModal(item)}
                      >
                        <FiEdit />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteItem(item._id)}
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
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editMode ? "Edit Menu Item" : "Add Menu Item"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Choose Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>

            <Button type="submit" disabled={submitLoading}>
              {submitLoading ? (
                <Spinner animation="border" size="sm" />
              ) : editMode ? (
                "Update"
              ) : (
                "Add"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default MenuItemManager;
