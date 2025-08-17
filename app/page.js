"use client"
import { useState } from "react";
import SidebarNav from "../components/SidebarNav";
import DashboardOverview from "../components/DashboardOverview";
import RestaurantPos from "../components/RestaurantPos";
import HotelManagement from "../components/HotelManagement";
import InventoryManagement from "../components/InventoryManagement";
import StaffManagement from "../components/StaffManagement";
import ReportsAnalytics from "../components/ReportsAnalytics";


export default function Home() {

  const [activeModule, setActiveModule] = useState("dashboard");

    const renderContent = () => {
    switch (activeModule) {
      case "dashboard":
        return <DashboardOverview />
      case "restaurant":
        return <RestaurantPos />
      case "hotel":
        return <HotelManagement />
      case "inventory":
        return <InventoryManagement />
      case "staff":
        return <StaffManagement />
      case "reports":
        return <ReportsAnalytics />
      default:
        return <DashboardOverview />
    }
  }
  return (
    <div className="flex h-screen bg-background">
      <SidebarNav activeModule={activeModule} onModuleChange={setActiveModule} />
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">
              {activeModule === "dashboard" && "Dashboard Overview"}
              {activeModule === "restaurant" && "Restaurant POS"}
              {activeModule === "hotel" && "Hotel Management"}
              {activeModule === "inventory" && "Inventory Management"}
              {activeModule === "staff" && "Staff Management"}
              {activeModule === "reports" && "Reports & Analytics"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {activeModule === "dashboard" && "Monitor your business performance and key metrics"}
              {activeModule === "restaurant" && "Manage orders, menu items, and restaurant operations"}
              {activeModule === "hotel" && "Handle reservations, room management, and guest services"}
              {activeModule === "inventory" && "Track stock levels, supplies, and inventory movements"}
              {activeModule === "staff" && "Manage employees, schedules, and staff assignments"}
              {activeModule === "reports" && "View detailed analytics and financial reports"}
            </p>
          </div>

          {renderContent()}
        </div>
      </main>
    </div>
  );
}
