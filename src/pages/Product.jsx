import { useState, useRef, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../Product.css';

export default function Product() {
    const [selectedPage, setSelectedPage] = useState("list");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editProduct, setEditProduct] = useState(null);

    const currentUser = localStorage.getItem("currentUser");

    const STORAGE_KEY = `products_${currentUser}`;

    const getInitialProducts = () => {
        if (!currentUser) return [];

        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error("Veri parse edilemedi:", e);
            }
        }

        // Yeni kullanıcıya varsayılan veriler
        return [
            {
                type: 'PC',
                brand: 'Hp',
                model: 'Z240',
                serial: 'HP001',
                status: 'Aktif',
                date: '2024-07'
            },
            {
                type: 'Monitör',
                brand: 'Dell',
                model: 'P2419H',
                serial: 'DL002',
                status: 'Aktif',
                date: '2024-03'
            }
        ];
    };

    const [products, setProducts] = useState(getInitialProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        }
    }, [products, currentUser]);

    const uniqueCategories = [...new Set(products.map(p => p.type))];

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

    const filteredProducts = products.filter(product => {
        const matchesCategory = !selectedCategory || product.type === selectedCategory;
        const matchesSearch =
            product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.serial.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    // Refs for form
    const typeRef = useRef();
    const brandRef = useRef();
    const modelRef = useRef();
    const serialRef = useRef();
    const statusRef = useRef();
    const dateRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            type: typeRef.current.value,
            brand: brandRef.current.value,
            model: modelRef.current.value,
            serial: serialRef.current.value,
            status: statusRef.current.value,
            date: dateRef.current.value
        };

        setProducts([...products, newProduct]);
        setSelectedPage("list");
    };

    if (!currentUser) {
        return <div className="p-4 text-danger">Kullanıcı bulunamadı. Lütfen giriş yapın.</div>;
    }

    const handleDelete = (serialToDelete) => {
        const confirmed = window.confirm("Bu ürünü silmek istediğinize emin misiniz?");
        if (!confirmed) return;

        const updatedProducts = products.filter(p => p.serial !== serialToDelete);
        setProducts(updatedProducts);
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setEditProduct({ ...products[index] });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSave = () => {
        const updated = [...products];
        updated[editingIndex] = editProduct;
        setProducts(updated);
        setEditingIndex(null);
        setEditProduct(null);
    };

    const handleEditCancel = () => {
        setEditingIndex(null);
        setEditProduct(null);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <Sidebar setSelectedPage={setSelectedPage} />
                </div>
                <div className="col-10">
                    <Navbar />

                    {selectedPage === "list" && (
                        <div className="products mt-4">
                            <h3>Stok Listesi</h3>

                            <div className="filters d-flex gap-3 mb-3">
                                <div className="search-box flex-grow-1">
                                    <input
                                        type="text"
                                        placeholder="Ürün ara..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="category-filter">
                                    <select
                                        value={selectedCategory}
                                        onChange={handleCategoryChange}
                                        className="form-select"
                                    >
                                        <option value="">Tümü</option>
                                        {uniqueCategories.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tür</th>
                                        <th>Marka</th>
                                        <th>Model</th>
                                        <th>Seri No</th>
                                        <th>Durum</th>
                                        <th>Teslim Tarihi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product, i) => (
                                        <tr key={i} onClick={() => editingIndex === null && handleEdit(i)}>
                                            {editingIndex === i ? (
                                                <>
                                                    <td>{i + 1}</td>
                                                    <td><input name="type" value={editProduct.type} onChange={handleEditChange} className="form-control" /></td>
                                                    <td><input name="brand" value={editProduct.brand} onChange={handleEditChange} className="form-control" /></td>
                                                    <td><input name="model" value={editProduct.model} onChange={handleEditChange} className="form-control" /></td>
                                                    <td><input name="serial" value={editProduct.serial} onChange={handleEditChange} className="form-control" /></td>
                                                    <td>
                                                        <select name="status" value={editProduct.status} onChange={handleEditChange} className="form-select">
                                                            <option value="Aktif">Aktif</option>
                                                            <option value="Pasif">Pasif</option>
                                                        </select>
                                                    </td>
                                                    <td><input name="date" type="month" value={editProduct.date} onChange={handleEditChange} className="form-control" /></td>
                                                    <td>
                                                        <button className="btn btn-success btn-sm me-2" onClick={handleEditSave}>Kaydet</button>
                                                        <button className="btn btn-secondary btn-sm" onClick={handleEditCancel}>İptal</button>
                                                    </td>
                                                </>
                                            ) : (
                                                <>
                                                    <td>{i + 1}</td>
                                                    <td>{product.type}</td>
                                                    <td>{product.brand}</td>
                                                    <td>{product.model}</td>
                                                    <td>{product.serial}</td>
                                                    <td>{product.status}</td>
                                                    <td>{product.date}</td>
                                                    <td>
                                                        <button onClick={(e) => { e.stopPropagation(); handleDelete(product.serial); }} className="btn btn-sm btn-danger">Sil</button>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    )}

                    {selectedPage === "add" && (
                        <div className="mt-4">
                            <h3>Ürün Ekle</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label>Tür</label>
                                    <input ref={typeRef} type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label>Marka</label>
                                    <input ref={brandRef} type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label>Model</label>
                                    <input ref={modelRef} type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label>Seri No</label>
                                    <input ref={serialRef} type="text" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label>Durum</label>
                                    <select ref={statusRef} className="form-select">
                                        <option value="Aktif">Aktif</option>
                                        <option value="Pasif">Pasif</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label>Teslim Tarihi</label>
                                    <input ref={dateRef} type="month" className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-primary">Kaydet</button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}