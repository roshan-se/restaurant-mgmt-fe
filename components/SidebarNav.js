"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChefHat,
  Hotel,
  Package,
  Users,
  BarChart3,
  Menu,
  X,
  ClipboardList,
} from "lucide-react";

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: BarChart3,
    description: "Overview & Analytics",
  },
  {
    id: "restaurant",
    label: "Restaurant POS",
    icon: ChefHat,
    description: "Orders & Menu Management",
  },
  {
    id: "hotel",
    label: "Hotel Management",
    icon: Hotel,
    description: "Reservations & Rooms",
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: Package,
    description: "Stock & Supplies",
  },
  {
    id: "staff",
    label: "Staff Management",
    icon: Users,
    description: "Employee & Scheduling",
  },
  {
    id: "reports",
    label: "Reports",
    icon: ClipboardList,
    description: "Financial & Analytics",
  },
];

const SidebarNav = ({ activeModule, onModuleChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Card
      className={`h-screen border-r bg-sidebar transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}>
      <div className='flex h-full flex-col'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-sidebar-border'>
          {!isCollapsed && (
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
                <ChefHat className='w-5 h-5 text-primary-foreground' />
              </div>
              <div>
                <h2 className='font-semibold text-sidebar-foreground'>
                  HospitalityPOS
                </h2>
                <p className='text-xs text-muted-foreground'>
                  Management System
                </p>
              </div>
            </div>
          )}
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setIsCollapsed(!isCollapsed)}
            className='h-8 w-8 p-0'>
            {isCollapsed ? (
              <Menu className='w-4 h-4' />
            ) : (
              <X className='w-4 h-4' />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className='flex-1 p-2 space-y-1'>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start gap-3 h-12 ${
                  isCollapsed ? "px-2" : ""
                } ${isActive ? "bg-primary text-primary-foreground" : ""}`}
                onClick={() => onModuleChange(item.id)}>
                <Icon className='w-5 h-5 flex-shrink-0' />
                {!isCollapsed && (
                  <div className='flex flex-col items-start'>
                    <span className='font-medium'>{item.label}</span>
                    <span className='text-xs opacity-70'>
                      {item.description}
                    </span>
                  </div>
                )}
              </Button>
            );
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className='p-4 border-t border-sidebar-border'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-accent rounded-full flex items-center justify-center'>
                <Users className='w-4 h-4 text-accent-foreground' />
              </div>
              <div className='flex-1'>
                <p className='text-sm font-medium text-sidebar-foreground'>
                  Admin User
                </p>
                <p className='text-xs text-muted-foreground'>
                  manager@restromate.com
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SidebarNav;
