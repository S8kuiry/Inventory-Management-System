"use client";

import { FlickeringGrid } from "@/components/ui/flickering-grid";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Page = () => {
  return (
    <>
      {/* Background */}
      <FlickeringGrid
        color="darkgreen"
        className="fixed inset-0 pointer-events-none bg-emerald-500/10"
      />

      <div className=" z-10 min-h-screen bg-white flex flex-col">
        
        {/* Navbar */}
        <nav className="w-full px-10 py-6 flex justify-between items-center">
          <h1 className="text-xl text-green-900 font-semibold">
            @Inventory
          </h1>

          <div className="flex gap-6 items-center">
            <SignedIn>
               <Link href="/dashboard" className="font-semibold text-green-900 hover:text-black">
              Dashboard
            </Link>
             <Link href="/add-product" className="font-semibold text-green-900 hover:text-black">
              Add Item
            </Link>

            </SignedIn>

             <SignedOut>
               <div  className="font-semibold text-green-900 hover:text-black">
@Start Managing            </div>
             <div className="font-semibold text-green-900 hover:text-black">
@Get Started            </div>

            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </nav>

        {/* Hero */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-4xl text-center">

            <p className="uppercase tracking-widest text-emerald-600 font-semibold mb-4">
              Inventory Management System
            </p>

            <h1 className="text-5xl font-bold mb-6">
              Manage Your Inventory <br />
              <span className="text-emerald-600">Smarter. Faster. Better.</span>
            </h1>

            <p className="text-gray-900 max-w-2xl  mx-auto mb-10">
              Track products, monitor stock levels, and streamline operations
              with a modern inventory platform.
            </p>

            {/* CTA */}
            <div className="flex justify-center gap-4">

              <SignedIn>
                <Link
                  href="/dashboard"
                  className="  px-8 py-3 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
                >
                  Go to Dashboard
                </Link>
              </SignedIn>
               <SignedIn>
                <Link
                  href="/inventory"
                  className=" border border-green-900 px-8 py-3 rounded-full bg-transparent text-green-900 font-medium hover:bg-gray-400/30 transition"
                >
                 Add To Inventory
                </Link>
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-8 py-3 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>

              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="px-8 py-3 rounded-full border border-green-900 text-green-900 font-semibold hover:bg-gray-100 transition">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>

            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-6 text-sm text-gray-900">
          © {new Date().getFullYear()} Inventory Management
        </footer>
      </div>
    </>
  );
};

export default Page;
