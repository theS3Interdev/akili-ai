import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-4">
      <div className="relative h-10 w-10 animate-spin">
        <Image
          alt="Akili"
          src="/cog.png"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          quality={100}
          priority={true}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Akili is contemplating a response...
      </p>
    </div>
  );
};

export default Loader;
