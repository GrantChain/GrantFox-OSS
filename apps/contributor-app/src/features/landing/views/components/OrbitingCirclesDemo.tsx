import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import Image from "next/image";

export function OrbitingCirclesDemo() {
  return (
    <div className="relative size-[340px]">
      <OrbitingCircles radius={120} iconSize={48}>
        <div className="flex size-full items-center justify-center rounded-full border bg-card">
          <Image
            src="/tech/typescript.svg"
            alt="TypeScript"
            width={26}
            height={26}
          />
        </div>
        <div className="flex size-full items-center justify-center rounded-full border bg-card">
          <Image
            src="/tech/tailwind.svg"
            alt="Tailwind CSS"
            width={26}
            height={26}
          />
        </div>
        <div className="flex size-full items-center justify-center rounded-full border bg-card">
          <Image src="/tech/next.svg" alt="Next.js" width={26} height={26} />
        </div>
        <div className="flex size-full items-center justify-center rounded-full border bg-card">
          <Image src="/tech/rust.svg" alt="Rust" width={26} height={26} />
        </div>
        <div className="flex size-full items-center justify-center rounded-full border bg-card">
          <Image src="/tech/stellar.svg" alt="Stellar" width={26} height={26} />
        </div>
        <div className="flex size-full items-center justify-center rounded-full border bg-card">
          <Image src="/tech/docker.svg" alt="docker" width={26} height={26} />
        </div>
      </OrbitingCircles>
    </div>
  );
}
