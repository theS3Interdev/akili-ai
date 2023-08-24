import Image from "next/image";

type Empty = {
  label: string;
};

const Empty = ({ label }: Empty) => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-20">
      <div className="relative h-72 w-72">
        <Image
          src="/empty.svg"
          alt="Empty"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          quality={100}
          priority={true}
        />
      </div>
      <p className="text-center text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default Empty;
