"use client";
import { BackButton } from '@/components/BackButton';
import Loader from '@/components/Loader';
import Sidebar from '@/components/Sidebar'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import { useAuth } from '@clerk/nextjs';
import { Pencil, Trash2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type Product = {
  id?: string;
  _id?: string; // Standard MongoDB ID field
  name: string;
  sku: string;
  price: number;
  quantity: number;
  lowStockAt: number;
}

const InventoryPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProduct, setFilteredProduct] = useState<Product[]>([]);
  const [loader, setLoader] = useState(false);
  const [input, setInput] = useState("");

  // Search logic
  const findContent = (value: string) => {
    setInput(value);
    if (!value.trim()) {
      setFilteredProduct(products);
      return;
    }
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProduct(filtered);
  };

  // Fetch Logic
  const getProducts = async () => {
    if (!userId) return;
    setLoader(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/user/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch");
      
      const data = await res.json();
      const productsArray = Array.isArray(data) ? data : data.products ?? [];
      
      setProducts(productsArray);
      setFilteredProduct(productsArray);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Error fetching products.");
    } finally {
      setLoader(false);
    }
  };

  // Delete logic 
  const handleDelete = async (id: string | undefined) => {
    if (!id) {
      alert("Invalid Product ID");
      return;
    }

    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Deleted Successfully");
        getProducts(); // Refresh the list
      } else {
        alert("Server returned an error while deleting");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to reach the server.");
    }
  };

  useEffect(() => {
    if (userId) getProducts();
  }, [userId]);

  return (
    <>
      <BackButton />
      <FlickeringGrid color="darkgreen" className="fixed inset-0 pointer-events-none bg-teal-100/10" />
      <Sidebar currentPath={pathname} />

      <div className="relative z-10 ml-64 min-h-screen overflow-y-auto">
        <main className='w-full p-8'>
          <div>
            <h1 className='text-2xl font-bold'>Inventory</h1>
            <p className='text-gray-900 text-sm'>Manage your products and track Inventory levels</p>
          </div>

          {/* Search Section */}
          <div className="w-full flex items-center justify-between px-3 py-3 bg-gray-200 rounded-lg mt-4">
            <input 
              value={input}
              onChange={(e) => findContent(e.target.value)} 
              placeholder='Search Here...' 
              className='w-[90%] h-[5vh] bg-white rounded-sm px-3 outline-none'
            />
            <button className='h-[5vh] rounded-sm text-white bg-teal-600/90 w-[8%]'>Search</button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-2">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="px-6 py-4 text-[11px] font-bold uppercase text-slate-500">Name</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase text-slate-500">SKU</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase text-slate-500">Price</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase text-slate-500">Quantity</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase text-slate-500">Low Stock</th>
                  <th className="px-6 py-4 text-right text-[11px] font-bold uppercase text-slate-500">Actions</th>
                </tr>
              </thead>

              {loader ? (
                <tbody>
                  <tr><td colSpan={6}><Loader /></td></tr>
                </tbody>
              ) : (
                <tbody className="divide-y divide-slate-100">
                  {filteredProduct.map((product, index) => {
                    const currentId = product.id || product._id;
                    const isOut = product.quantity === 0;
                    const isLow = product.quantity > 0 && product.quantity <= product.lowStockAt;

                    return (
                      <tr key={currentId || index} className="group hover:bg-slate-50/30 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-slate-800">{product.name}</td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">{product.sku}</span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-600">₹{product.price.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-semibold ${isOut ? "text-red-500" : isLow ? "text-amber-500" : "text-emerald-600"}`}>
                            {isOut ? "Out of Stock" : `${product.quantity} Units`}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{product.lowStockAt}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => router.push(`/edit/${currentId}`)} 
                              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all rounded-md"
                            >
                              <Pencil size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(currentId)} 
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all rounded-md"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {!loader && filteredProduct.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-slate-500">No products found</td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default InventoryPage;