import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

const EditListing = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    longitude: "",
    latitude: "",
    image: null as File | string | null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await api.get(`/api/products/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const { title, description, category, price, location, image } = res.data;
        setFormData({
          title,
          description,
          category,
          price: price.toString(),
          longitude: location.coordinates[0].toString(),
          latitude: location.coordinates[1].toString(),
          image,
        });
      } catch {
        toast({ title: "Failed to load product", variant: "destructive" });
        navigate("/my-listings");
      } finally {
        setLoading(false);
      }
    };
    if (user && id) fetchProduct();
  }, [user, id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value as any);
    });
    try {
      await api.put(`/api/products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast({ title: "Listing updated!" });
      navigate("/my-listings");
    } catch {
      toast({ title: "Update failed", variant: "destructive" });
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-[40vh]">Loading...</div>;

  return (
    <>
      <Header />
      <main className="container py-8 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Listing</h1>
        <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Title"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Description"
              className="w-full border rounded px-3 py-2"
              rows={3}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Home">Home</option>
              <option value="Books">Books</option>
              <option value="Sports">Sports</option>
              <option value="Other">Other</option>
              <option value="Furniture">Furniture</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Price"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">Longitude</label>
              <input
                name="longitude"
                type="number"
                value={formData.longitude}
                onChange={handleChange}
                required
                placeholder="Longitude"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Latitude</label>
              <input
                name="latitude"
                type="number"
                value={formData.latitude}
                onChange={handleChange}
                required
                placeholder="Latitude"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 font-medium">Image</label>
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
            {typeof formData.image === "string" && (
              <img
                src={formData.image}
                alt="Current"
                className="mt-2 rounded max-h-40"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Update Listing
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default EditListing;