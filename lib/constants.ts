import { Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";

export const MAX_FREE_ATTEMPTS = 5;

export const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-violet-800",
    bgColor: "bg-violet-800/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-800",
    bgColor: "bg-pink-800/10",
    href: "/image",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-800",
    bgColor: "bg-orange-800/10",
    href: "/video",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-800",
    bgColor: "bg-emerald-800/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-800",
    bgColor: "bg-green-800/10",
    href: "/code",
  },
];
