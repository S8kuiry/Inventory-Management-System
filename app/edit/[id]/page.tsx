"use client";

import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { BellRing, IndianRupee, Layers, Package, PlusCircle, Tag } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BackEdit } from "@/components/BackButton";

interface Product {
  name: string;
  sku: string;
  price: number;
  quantity: number;
  lowStockAt: number;
}

const EditProduct = () => {
  const pathname = usePathname();
  const params = useParams();
  const id = params.id as string;

  const [name, setName] = useState<string>("");
  const [sku, setSku] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [lowStockAt, setLowStockAt] = useState<number>(0);

  // fetch product by id
  const getProduct = async () => {
    try {
      const res = await fetch(`/api/contacts/${id}`, { method: "GET" });
      if (!res.ok) {
        alert("Error fetching product...");
        return;
      }
      const data = await res.json();
      const product: Product = data.editProduct ?? data.product ?? {};

      // set defaults to avoid undefined
      setName(product.name ?? "");
      setSku(product.sku ?? "");
      setPrice(product.price ?? 0);
      setQuantity(product.quantity ?? 0);
      setLowStockAt(product.lowStockAt ?? 0);
    } catch (err) {
      console.error("Fetch product error:", err);
      alert("Failed to fetch product");
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);



  // onsubmit function
    const handleSubmit = async (e:React.FormEvent)=>{
      e.preventDefault()
     const res = await fetch(`/api/contacts/${id}`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ name, sku, price, quantity, lowStockAt })
  
     })
  
     if(res.ok){
      setName("")
      setSku("")
      setPrice(0)
      setQuantity(0)
      setLowStockAt(0)
          alert("Product updated successfully 🎉")
  
  
  
       
      
    }
    }

  return (
    <>
    <BackEdit/>
      <FlickeringGrid color="darkgreen" className="fixed inset-0 pointer-events-none bg-teal-100/10" />
      <Sidebar currentPath={pathname} />
      <div className="relative z-10 ml-64 min-h-screen overflow-y-auto">
        <main className="w-full p-8">
          <div>
            <h1 className="text-2xl font-bold text-black">Edit Product</h1>
            <p className="text-gray-900 shadow-2xl text-sm">Update your product details</p>
          </div>

          <div className="max-w-2xl mx-auto p-4">
            <div className="bg-white rounded-lg border border-slate-200 shadow-2xl pb-6 overflow-hidden">
              <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <PlusCircle className="text-teal-600/90" size={24} />
                  Edit Inventory
                </h2>
                <p className="text-sm text-slate-500 mt-1">Update details for this stock item.</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                {/* Product Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Product Name</label>
                  <div className="relative group">
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors" size={18} />
                    <input
                      required
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Laptop Stand"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-800"
                    />
                  </div>
                </div>

                {/* SKU & Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">SKU</label>
                    <div className="relative group">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors" size={18} />
                      <input
                        required
                        name="sku"
                        type="text"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        placeholder="LS-404"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Price (INR)</label>
                    <div className="relative group">
                      <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors" size={18} />
                      <input
                        required
                        name="price"
                                                type="number"

                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        placeholder="0.00"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Quantity & Low Stock */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Quantity</label>
                    <div className="relative group">
                      <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors" size={18} />
                      <input
                        required
                                                type="number"

                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        placeholder="0"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Low Stock Alert</label>
                    <div className="relative group">
                      <BellRing className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors" size={18} />
                      <input
                        required
                        type="number"
                        name="lowStockAt"
                        value={lowStockAt}
                        onChange={(e) => setLowStockAt(Number(e.target.value))}
                        placeholder="10"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Update Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-teal-600/90 hover:bg-teal-600 text-white font-bold rounded-lg shadow-xl shadow-indigo-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    Update to Inventory
                    <PlusCircle size={20} className="transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default EditProduct;
