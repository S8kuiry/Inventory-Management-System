"use client";
import { BackButton } from '@/components/BackButton';
import Sidebar from '@/components/Sidebar'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import { BellRing, IndianRupee, Layers, Package, PlusCircle, Tag } from 'lucide-react';
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
    import { toast } from "sonner"


const AddProduct = () => {
  const pathname = usePathname()

  const [name, setName] = useState("")
  const [sku, setSku] = useState("")
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [lowStockAt, setLowStockAt] = useState(0)

  // onsubmit function
  const handleSubmit = async (e:React.FormEvent)=>{
    e.preventDefault()
   const res = await fetch('/api/contacts',{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ name, sku, price, quantity, lowStockAt })

   })
const data = await res.json();
if(data.success === true){
   
    setName("")
    setSku("")
    setPrice(0)
    setQuantity(0)
    setLowStockAt(0)
        alert("Product saved successfully 🎉")

}else{
  alert(data.message)
}
}


  return (

    <>
    <BackButton/>
      {/* Background */}
      <FlickeringGrid
        color="darkgreen"
        className="fixed inset-0 pointer-events-none bg-teal-100/10"
      />
      <Sidebar currentPath={pathname} />

      <div className="relative z-10 ml-64 min-h-screen overflow-y-auto">
        <main className='w-full     p-8'>
          {/*Header */}
          <div className="">
            <div className="">
              <div className=" text-black  ">
                <h1 className='text-2xl font-bold '>Add Products</h1>
                <p className='text-gray-900 text-sm shadow-3xl '>Add all of yout products here</p>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto p-4">
            <div className="bg-white rounded-lg border border-slate-200 shadow-2xl pb-6 overflow-hidden">

              {/* Header */}
              <div className="px-8 py-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <PlusCircle className="text-teal-600/90" size={24} />
                    Inventory Entry
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">Add details for new stock arrival.</p>
                </div>

              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-5">

                {/* Product Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Product Name</label>
                  <div className="relative group">
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                    <input
                      required
                      name="name"
                      value={name}
                      type="text"
                      onChange={(e) => setName(e.target.value)}

                      placeholder="e.g. Laptop Stand"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-800"
                    />
                  </div>
                </div>

                {/* SKU & Price Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">SKU</label>
                    <div className="relative group">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                      <input
                        required
                        name="sku"
                        value={sku}
                        type="text"
                        onChange={(e) => setSku(e.target.value)}

                        placeholder="LS-404"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Price (INR)</label>
                    <div className="relative group">
                      <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                      <input
                        required
                        name="price"
                        value={price}
                        min={0}

                        onChange={(e) => setPrice(Number(e.target.value))}

                        placeholder="0.00"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Quantity & Threshold Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Quantity</label>
                    <div className="relative group">
                      <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                      <input
                        required
                        name="quantity"
                        value={quantity}
                        placeholder="0"

                        min={0}

                        onChange={(e) => setQuantity(Number(e.target.value))}

                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Low Stock Alert</label>
                    <div className="relative group">
                      <BellRing className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                      <input
                        required

                        name="lowStockAt"
                        value={lowStockAt}
                        min={0}
                        onChange={(e) => setLowStockAt(Number(e.target.value))}
                        placeholder="10"
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-teal-600/90 hover:bg-teal-600 text-white font-bold rounded-lg shadow-xl shadow-indigo-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                  >
                    Add to Inventory
                    <PlusCircle size={20} className="group-hover:rotate-90 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>


        </main>
      </div>
    </>
  )
}

export default AddProduct