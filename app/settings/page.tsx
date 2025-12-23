"use client";

import Sidebar from "@/components/Sidebar";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { usePathname } from "next/navigation";
import { UserProfile, UserButton, SignOutButton } from "@clerk/nextjs";
import { LogOut, ShieldCheck, User } from "lucide-react";
import { BackButton } from "@/components/BackButton";

const Settings = () => {
  const pathname = usePathname();

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
        <main className="w-full p-8 space-y-8">

          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-900 shadow-2xl">
              Manage your account, security, and preferences
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="cursor-pointer bg-white border border-gray-400/90 rounded-lg p-5 flex items-center gap-4">
              <User className="text-teal-600" />
              <div>
                <p className="text-sm font-semibold">Account</p>
                <p className="text-xs text-gray-500">
                  Profile & personal info
                </p>
              </div>
            </div>

            <div className="cursor-pointer bg-white border border-gray-400/90 rounded-lg p-5 flex items-center gap-4">
              <ShieldCheck className="text-teal-600" />
              <div>
                <p className="text-sm font-semibold">Security</p>
                <p className="text-xs text-gray-500">
                  Password, MFA & sessions
                </p>
              </div>
            </div>

            <div className="shadow shadow-2xl cursor-pointer bg-white border border-gray-400/90 rounded-lg p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <LogOut className="text-red-500" />
                <div>
                  <p className="text-sm font-semibold">Logout</p>
                  <p className="text-xs text-gray-500">
                    End your current session
                  </p>
                </div>
              </div>

              <SignOutButton>
                <button className="text-sm text-red-600 hover:underline">
                  Sign out
                </button>
              </SignOutButton>
            </div>
          </div>

          {/* Full Account Settings (Clerk Native UI) */}
          <div className="bg-white rounded-xl shadow shadow-2xl border border-gray-400/90 shadow-sm p-4">
            <UserProfile routing="hash"
              appearance={{
                elements: {
                  card: "shadow-none border-none",
                  navbar: "hidden",
                  headerTitle: "text-gray-900",
                  headerSubtitle: "text-gray-500",
                  profileSectionTitle: "text-gray-900",
                },
                variables: {
                  colorPrimary: "#0d9488", // teal-600
                  borderRadius: "8px",
                },
              }}
            />
          </div>

        </main>
      </div>
    </>
  );
};

export default Settings;
