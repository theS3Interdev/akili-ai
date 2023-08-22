import React, { ReactNode } from "react";
import NavigationBar from "@/components/navigation-bar";
import SideBar from "@/components/side-bar";

type Children = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Children) => {
  return (
    <div className="relative h-full">
      <div className="z-[80] hidden h-full bg-[#E6F4F1] md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col">
        <SideBar />
      </div>
      <main className="pb-10 md:pl-72">
        <NavigationBar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
