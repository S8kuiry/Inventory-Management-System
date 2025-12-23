"use client";
import { BackButton } from '@/components/BackButton';
import Sidebar from '@/components/Sidebar'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import { AlertCircle, CheckCircle2, Eye, Pencil, Trash2, XCircle } from 'lucide-react';
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


type Product = {
  _id: string
  name: string
  sku: string
  price: number
  quantity: number
  lowStockAt: number
}


const prod = [
  {
    id: "1",
    name: "Wireless Mouse",
    sku: "WM-001",
    price: 899,
    quantity: 120,
    lowStockAt: 10,
  },
  {
    id: "2",

    name: "Mechanical Keyboard",
    sku: "MK-023",
    price: 3499,
    quantity: 8,
    lowStockAt: 15,
  },
  {
    id: "3",

    name: "USB-C Cable",
    sku: "UC-110",
    price: 399,
    quantity: 0,
    lowStockAt: 20,
  },
  {
    id: "4",

    name: "27-inch Monitor",
    sku: "MN-270",
    price: 18999,
    quantity: 34,
    lowStockAt: 5,
  },
  {
    id: "5",

    name: "Laptop Stand",
    sku: "LS-404",
    price: 1499,
    quantity: 6,
    lowStockAt: 10,
  },
];

const InventoryPage = () => {
  const router = useRouter();
  const [products,setProducts] = useState<Product[]>([])

  const pathname = usePathname()
  const [input, setInput] = useState("")
  const [filteredProduct, setFilteredProduct] = useState<Product[]>(products)


  // filter product area

  const findContent = (value: string) => {
    setInput(value)

    if (!value.trim()) {
      setFilteredProduct(products)
      return
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredProduct(filtered)


  }

  //fetch handle logic
  const getProducts = async ()=>{
    const res = await fetch('/api/contacts',{
      method:"GET"
    })
    if(!res.ok){
      alert("Error in fetching Products ...")
    }
    const data = await res.json()
     // 🔥 IMPORTANT: ensure array
    const productsArray = Array.isArray(data)
      ? data
      : data.products ?? []
    setProducts(productsArray)
    setFilteredProduct(productsArray)
  }

 

  // delete logic 
  const handleDelete  = async (id:string)=>{

    const res = await fetch('/api/contacts',{
      method:"DELETE",
      headers:{'Content-Type' : 'application/json'},
          body:JSON.stringify({id})
    })

    if(!res.ok){
      alert("Error Occuring while performing delete")
    }
    alert("Deleted Successfully")
    getProducts()
    
  }

   useEffect(()=>{
    getProducts()

  },[])

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
                <h1 className='text-2xl font-bold '>Inventory</h1>
                <p className='text-gray-900 text-sm shadow-3xl'>Manage your products and track Inventory levels</p>
              </div>
            </div>
          </div>

          {/*--serach section */}
          <div className="w-full flex item-center justify-between px-3 py-3 bg-gray-200 rounded-lg mt-4">
            <input onChange={(e) => findContent(e.target.value)} placeholder='Search Here...' className='w-[90%] h-[5vh] bg-white rounded-sm px-3'></input>
            <button className='outline-none focus:outline-none focus:ring-0 h-[5vh] flex items-center justify-center rounded-sm text-white bg-teal-600/90 cursor-pointer w-[8%] border-none'>Search</button>
          </div>

          {/*Products table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-2">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">Name</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">SKU</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">Price</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">Quantity</th>
                  <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">Low Stock At</th>
                  <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-widest text-slate-500">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredProduct?.map((product, index) => {
                  const isOut = product.quantity === 0;
                  const isLow = product.quantity > 0 && product.quantity <= product.lowStockAt;

                  return (
                    <tr key={index} className="group hover:bg-slate-50/30 transition-colors">
                      {/* Name */}
                      <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                        {product.name}
                      </td>

                      {/* SKU */}
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                          {product.sku}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">
                        ₹{product.price.toLocaleString()}
                      </td>

                      {/* Quantity with Status Styling */}
                      <td className="px-6 py-4">
                        <span className={`text-sm font-semibold ${isOut ? "text-red-500" : isLow ? "text-amber-500" : "text-emerald-600"
                          }`}>
                          {isOut ? "0 (Out of Stock)" : `${product.quantity} Units`}
                        </span>
                      </td>

                      {/* Low Stock At */}
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {product.lowStockAt}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {/*  <button className="p-2 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
                      <Eye size={16} />
                    </button>*/}
                          <button onClick={() => router.push(`/edit/${product._id}`)} className="cursor-pointer p-2 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                            <Pencil size={16} />
                          </button>
                          <button onClick={()=>handleDelete(product._id)} className="cursor-pointer p-2 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {!filteredProduct && (
 <tr>
      {/* 👇 colSpan MUST match number of columns */}
      <td
        colSpan={6}
        className="px-6 py-4 text-center text-sm font-medium text-slate-500"
      >
        No products found
      </td>
    </tr>                )}
              </tbody>
            </table>
          </div>
        </main>


      </div>

    </>
  )
}

export default InventoryPage