"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "@/components/side-bar";

type SideBarProp = {
  apiLimitCount: number;
};

const MobileSideBar = ({ apiLimitCount = 0 }: SideBarProp) => {
  /* hydration error code fix start */
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  /* hydration error code fix end */

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0">
        <SideBar apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
