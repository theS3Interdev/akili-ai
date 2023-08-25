"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";

import APILimitCounter from "@/components/api-limit-counter";

import { cn } from "@/lib/utils";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    color: "text-sky-800",
    href: "/dashboard",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-800",
    href: "/conversation",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-800",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-800",
    href: "/video",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-800",
    href: "/music",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-800",
    href: "/code",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

type SideBarProp = {
  apiLimitCount: number;
};

const SideBar = ({ apiLimitCount = 0 }: SideBarProp) => {
  const pathName = usePathname();

  return (
    <div className="flex h-full flex-col space-y-4 bg-[#E6F4F1] py-4">
      <div className="flex-1 px-3 py-2">
        {/* logo section start */}
        <Link href="/dashboard" className="mb-14 flex items-center pl-3">
          <div className="relative mr-4 h-8 w-8">
            <Image fill alt="Logo" src="/logo.svg" />
          </div>
          <h1 className="font-montserrat text-2xl font-bold">Akili</h1>
        </Link>
        {/* logo section end */}

        {/* route links section start */}
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-medium transition  hover:bg-[#404756]/10 hover:text-[#404756]",
                pathName === route.href
                  ? "bg-[#404756]/10 text-[#404756]"
                  : "text-[#404756]",
              )}
            >
              <div className="flex flex-1 items-center">
                <route.icon className={cn("mr-3 h-5 w-5", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
        {/* route links section end */}
      </div>
      <APILimitCounter apiLimitCount={apiLimitCount} />
    </div>
  );
};

export default SideBar;
