import { UserButton } from "@clerk/nextjs";

import MobileSideBar from "@/components/mobile-side-bar";
import { getAPILimitCount } from "@/lib/api-limit";

const Navigationbar = async () => {
  const apiLimitCount = await getAPILimitCount();

  return (
    <div className="flex items-center p-4">
      <MobileSideBar apiLimitCount={apiLimitCount} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </div>
  );
};

export default Navigationbar;
