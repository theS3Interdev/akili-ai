import Image from "next/image";

type Empty = {
  label: string;
};

const Empty = ({ label }: Empty) => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-20">
      <div className="relative h-72 w-72">
        <Image src="/empty.svg" fill alt="Empty" />
      </div>
      <p className="text-center text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default Empty;
