"use client";
import { BackButton } from '@/components/BackButton';
import Loader from '@/components/Loader';
import ProductsChart from '@/components/ProductsChart';
import Sidebar from '@/components/Sidebar';
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import { useAuth } from '@clerk/nextjs';
import { TrendingUp, AlertTriangle, Package, DollarSign, Activity, HeartPulseIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState, useMemo } from 'react';

type Product = {
  _id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  lowStockAt: number;
  createdAt?: string;
};

const Dashboard = () => {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const {userId} = useAuth()

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/user/${userId}`, { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      const productsArray = Array.isArray(data) ? data : data.products ?? [];
      setProducts(productsArray);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(!userId)return ;
    getProducts();
  }, [userId]);

  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalValue = products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    const lowStockCount = products.filter(p => p.quantity <= p.lowStockAt && p.quantity > 0).length;
    return { totalProducts, totalValue, lowStockCount };
  }, [products]);

  const efficiency = useMemo(() => {
    if (products.length === 0) return { inStock: 0, lowStock: 0, outOfStock: 0 };
    const low = products.filter(p => p.quantity <= p.lowStockAt && p.quantity > 0).length;
    const out = products.filter(p => p.quantity === 0).length;
    const fine = products.length - low - out;
    const getPerc = (val: number) => Math.round((val / products.length) * 100);

    return { inStock: getPerc(fine), lowStock: getPerc(low), outOfStock: getPerc(out) };
  }, [products]);

  const getProductDate = (product: Product) => {
  // 1. If the backend actually sends a createdAt timestamp, use it.
  if (product.createdAt) return new Date(product.createdAt);

  // 2. Try to parse the MongoDB-style ObjectId if it exists and is valid length
  if (product._id && product._id.length >= 8) {
    try {
      const timestamp = parseInt(product._id.substring(0, 8), 16) * 1000;
      if (!isNaN(timestamp)) {
        return new Date(timestamp);
      }
    } catch (e) {
      console.error("Could not parse ID timestamp");
    }
  }

  // 3. Fallback: If no date can be found, return the current date 
  // (This prevents the app from crashing)
  return new Date();
};

  // --- FIXED: NOW SHOWING ALL DAYS INDIVIDUALLY ---
  const monthlyChartData = useMemo(() => {
    const data = [];
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= totalDays; day++) {
      const start = new Date(year, month, day, 0, 0, 0);
      const end = new Date(year, month, day, 23, 59, 59);

      const count = products.filter(p => {
        const d = getProductDate(p);
        return d >= start && d <= end;
      }).length;

      data.push({
        week: `${day} ${start.toLocaleDateString('en-IN', { month: 'short' })}`,
        products: count
      });
    }
    return data;
  }, [products]);

  return (
    <>
      <BackButton />
      <FlickeringGrid color="darkgreen" className="fixed inset-0 pointer-events-none bg-teal-100/10" />
      <Sidebar currentPath={pathname} />

      <div className="relative z-10 ml-64 min-h-screen overflow-y-auto bg-transparent">
        <main className='w-full p-8'>
          <header className="mb-8">
            <h1 className='text-3xl font-bold text-slate-900'>Inventory Insights</h1>
            <p className='text-slate-600 text-sm'>Daily performance tracking for {new Date().toLocaleString('default', { month: 'long' })}.</p>
          </header>

          {loading ? (
            <div className="flex h-[60vh] items-center justify-center"><Loader /></div>
          ) : (
            <div className="space-y-8">
              {/* TOP ROW: Metrics + Health */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <Activity size={20} className="text-teal-600" />
                    <h2 className='text-slate-800 text-lg font-semibold'>Key Metrics</h2>
                  </div>
                  <div className="flex items-start justify-between px-2 py-2 flex-wrap h-full ">
                    <MetricCard label="Products" value={stats.totalProducts} color="teal" icon={<Package size={16} />} />
                    <MetricCard label="Value" value={`₹${stats.totalValue.toLocaleString()}`} color="blue" icon={<DollarSign size={16} />} />
                    <MetricCard label="Low Stock" value={stats.lowStockCount} color="red" icon={<AlertTriangle size={16} />} />
                  </div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center shadow-sm">
                  <div className="w-full flex justify-start items-center gap-2 mb-6">
                    <HeartPulseIcon size={20} className="text-teal-600" />
                    <h2 className='text-slate-800 text-lg font-semibold'>Health</h2>
                  </div>                   <div className="relative w-32 h-32 mb-4">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#0d9488" strokeWidth="3" strokeDasharray={`${efficiency.inStock}, 100`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">{efficiency.inStock}%</div>
                  </div>
                  <div className="w-full space-y-2">
                    <EfficiencyLabel color="bg-emerald-600" label="OK" percent={efficiency.inStock} />
                    <EfficiencyLabel color="bg-red-600" label="Low" percent={efficiency.lowStock} />
                  </div>
                </div>
              </div>

              {/* MIDDLE ROW: FULL WIDTH CHART (So 31 days are actually visible) */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp size={20} className="text-teal-600" />
                    <h2 className='text-slate-800 text-lg font-semibold'>Daily Inventory Growth</h2>
                  </div>
                  {/* Scrollable Container */}
                  <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-teal-100 scrollbar-track-transparent">
                    <div className="h-72 min-w-[800px] lg:min-w-full">
                      <ProductsChart data={monthlyChartData} />
                    </div>
                  </div>
                </div>

                {/* BOTTOM ROW: Stock List */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 max-h-[400px]">

                  <div className="w-full flex justify-start items-start gap-2 mb-6">
                    <Package size={24} className="text-teal-600" />

                    <h2 className='text-slate-800 text-lg font-semibold mb-4'>Live Stock Status</h2>

                  </div>

                  <div className="space-y-2 overflow-y-auto h-[300px] pr-2">
                    
                    {products.map((itm,index) => {
      // Logic inside curly braces
      const currentId = itm._id || itm.id; 
      
      return (
        <div key={currentId} className="flex items-center justify-between px-4 py-2 bg-slate-200/70 rounded-lg border border-slate-100">
          <span className='text-sm font-medium text-slate-700'>{itm.name}</span>
          <span className={`text-sm font-bold ${itm.quantity <= itm.lowStockAt ? 'text-red-600' : 'text-emerald-600'}`}>
            {itm.quantity} Units
          </span>
        </div>
      );
    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

const MetricCard = ({ label, value, color, icon }: { label: string, value: string | number, color: 'teal' | 'red' | 'blue', icon?: React.ReactNode }) => {
  const themes = {
    teal: "border-teal-200 bg-teal-50 text-teal-700",
    red: "border-red-200 bg-red-50 text-red-700",
    blue: "border-blue-200 bg-blue-50 text-blue-700"
  };

  return (
    <div className={`w-36 cursor-pointer flex flex-col items-center justify-center border rounded-lg py-4 px-2 transition-all hover:scale-105 ${themes[color]}`}>
      <div className="mb-1 opacity-80">{icon}</div>
      <div className="text-xl font-bold text-slate-900">{value}</div>
      <div className="text-[10px] uppercase mt-1 font-bold opacity-70 tracking-tight">{label}</div>
    </div>
  );
};

const EfficiencyLabel = ({ color, label, percent }: { color: string, label: string, percent: number }) => (
  <div className="flex items-center justify-between text-sm text-slate-600 border-b border-slate-50 pb-2">
    <div className="flex items-center gap-2">
      <div className={`w-2.5 h-2.5 rounded-full ${color}`}></div>
      <span>{label}</span>
    </div>
    <span className="font-bold text-slate-800">{percent}%</span>
  </div>
);

export default Dashboard;