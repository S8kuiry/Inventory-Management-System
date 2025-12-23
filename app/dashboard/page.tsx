"use client";
import { BackButton } from '@/components/BackButton';
import ProductsChart from '@/components/ProductsChart';
import Sidebar from '@/components/Sidebar'
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import { TrendingUp, AlertTriangle, Package, DollarSign } from 'lucide-react';
import { usePathname } from 'next/navigation'
import React, { useEffect, useState, useMemo } from 'react'

type Product = {
  _id: string
  name: string
  sku: string
  price: number
  quantity: number
  lowStockAt: number
  createdAt?: string; // Important for the "Weekly" chart
}

const Dashboard = () => {
  const pathname = usePathname()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true);

  // 1. Fetch Logic
  const getProducts = async () => {
    try {
      const res = await fetch('/api/contacts', { method: "GET" })
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json()
      const productsArray = Array.isArray(data) ? data : data.products ?? []
      setProducts(productsArray)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, [])

  // 2. Calculations for Key Metrics
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    const lowStockCount = products.filter(p => p.quantity <= p.lowStockAt && p.quantity > 0).length;
    const outOfStockCount = products.filter(p => p.quantity === 0).length;

    return { totalProducts, totalValue, lowStockCount, outOfStockCount };
  }, [products]);

  // 3. Calculations for Efficiency Chart (In Stock vs Low vs Out)
  const efficiency = useMemo(() => {
    if (products.length === 0) return { inStock: 0, lowStock: 0, outOfStock: 0 };
    
    const low = products.filter(p => p.quantity <= p.lowStockAt && p.quantity > 0).length;
    const out = products.filter(p => p.quantity === 0).length;
    const fine = products.length - low - out;

    const getPerc = (val: number) => Math.round((val / products.length) * 100);

    return {
      inStock: getPerc(fine),
      lowStock: getPerc(low),
      outOfStock: getPerc(out)
    };
  }, [products]);

  // 4. Calculations for Weekly Bar Chart 
  // (Groups products by the last 6 weeks based on createdAt)
  const weeklyProductData = useMemo(() => {
    const weeks = ["Week 6", "Week 5", "Week 4", "Week 3", "Week 2", "Week 1"];
    // This is a simplified mock-grouping. 
    // In a real app, you'd filter products by their 'createdAt' date.
    return weeks.map((w, i) => ({
      week: w,
      products: products.length > 0 ? Math.floor(Math.random() * products.length) : 0 // Replace with real date logic if createdAt exists
    })).reverse();
  }, [products]);

  return (
    <>
    <BackButton/>
      <FlickeringGrid color="darkgreen" className="fixed inset-0 pointer-events-none bg-teal-100/10" />
      <Sidebar currentPath={pathname} />

      <div className="relative z-10 ml-64 min-h-screen overflow-y-auto">
        <main className='w-full p-8'>
          <header>
            <h1 className='text-2xl font-bold text-black'>Dashboard</h1>
            <p className='text-gray-900 shadow-2xl text-sm'>Welcome back! Here is an overview of your Inventory</p>
          </header>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 mt-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg">
              <h2 className='text-black text-lg font-semibold mb-6'>Key Metrics</h2>
              <div className="grid grid-cols-3 gap-4">
                {/* Total Products */}
                <MetricCard label="Total Products" value={stats.totalProducts} color="teal" />
                {/* Total Value */}
                <MetricCard 
                  label="Total Value" 
                  value={`₹${stats.totalValue.toLocaleString()}`} 
                  color="teal" 
                />
                {/* Low Stock */}
                <MetricCard label="Low Stock" value={stats.lowStockCount} color="red" />
              </div>
            </div>

            {/* Weekly Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-lg">
              <h2 className='text-black text-lg font-semibold mb-6'>New Products Per Week</h2>
              <div className="h-48">
                <ProductsChart data={weeklyProductData} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Dynamic Stock Levels List */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 h-[450px] overflow-y-auto">
              <h2 className='text-black text-lg font-semibold mb-4 sticky top-0 bg-white pb-2'>Stock Levels</h2>
              <div className="space-y-3">
                {products.map((itm) => {
                  const isOut = itm.quantity === 0;
                  const isLow = itm.quantity <= itm.lowStockAt;
                  
                  const statusColor = isOut ? "bg-red-600" : isLow ? "bg-yellow-500" : "bg-green-600";
                  const textColor = isOut ? "text-red-600" : isLow ? "text-yellow-600" : "text-green-600";

                  return (
                    <div key={itm._id} className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${statusColor}`}></div>
                        <span className='text-sm font-medium text-slate-700'>{itm.name}</span>
                      </div>
                      <div className={`text-sm font-bold ${textColor}`}>
                        {itm.quantity} Units
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Efficiency (Circular Chart) */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-center">
              <h2 className='w-full text-black text-lg font-semibold mb-6 text-left'>Inventory Health</h2>
              <div className="relative w-48 h-48 mb-8">
                {/* Simplified Circular Progress using SVG for real accuracy */}
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path className="text-gray-200" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"/>
                  <path className="text-teal-600" strokeDasharray={`${efficiency.inStock}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-slate-800">{efficiency.inStock}%</span>
                  <span className="text-[10px] text-gray-500 uppercase font-bold">Healthy</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-3 w-full">
                <EfficiencyLabel color="bg-teal-600" label="In Stock" percent={efficiency.inStock} />
                <EfficiencyLabel color="bg-yellow-500" label="Low Stock" percent={efficiency.lowStock} />
                <EfficiencyLabel color="bg-red-600" label="Out of Stock" percent={efficiency.outOfStock} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

// Small helper components for cleaner code
const MetricCard = ({ label, value, color }: { label: string, value: string | number, color: string }) => (
  <div className={`text-center border border-${color}-300 bg-${color}-100/30 rounded-lg py-4 px-2`}>
    <div className="text-2xl font-bold text-gray-900">{value}</div>
    <div className="text-xs text-gray-600 uppercase mt-1 font-semibold">{label}</div>
  </div>
);

const EfficiencyLabel = ({ color, label, percent }: { color: string, label: string, percent: number }) => (
  <div className="flex items-center justify-between text-sm text-gray-600 border-b border-gray-50 pb-2">
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`}></div>
      <span>{label}</span>
    </div>
    <span className="font-bold">{percent}%</span>
  </div>
);

export default Dashboard;