"Use Client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

import { MAX_FREE_ATTEMPTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type APILimitCount = {
  apiLimitCount: number;
};

const APILimitCounter = ({ apiLimitCount = 0 }: APILimitCount) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="border-0 bg-[#404756]/10">
        <CardContent className="py-6">
          <div className="mb-4 space-y-2 text-center text-sm text-[#404756]">
            <p className="pb-1 font-semibold">
              {apiLimitCount} of {MAX_FREE_ATTEMPTS}{" "}
              <span className="text-xs">Free Generation Attempts</span>
            </p>
            <Progress
              className="h-3"
              value={(apiLimitCount / MAX_FREE_ATTEMPTS) * 100}
            />
          </div>
          <Button
            className="w-full text-xs uppercase tracking-wide"
            variant="premium"
          >
            Upgrade
            <Zap className="ml-2 h-4 w-4 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default APILimitCounter;
