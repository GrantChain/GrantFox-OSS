import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";

export const Hero = () => {
  return (
    <div className="flex w-full sm:max-w-[500px] md:max-w-[600px] lg:max-w-[800px] mx-auto overflow-x-hidden">
      <div className="relative flex flex-col items-center justify-center overflow-hidden mb-10">
        <ScrollVelocityContainer className="text-4xl font-bold tracking-[-0.02em] md:text-7xl md:leading-[5rem]">
          <ScrollVelocityRow baseVelocity={5} direction={1}>
            GrantFox <div className="mx-4">|</div> Stellar{" "}
            <div className="mx-4">|</div> Campaigns{" "}
            <div className="mx-4">|</div> Open Source |
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={5} direction={-1}>
            GrantFox <div className="mx-4">|</div> Stellar{" "}
            <div className="mx-4">|</div> Campaigns{" "}
            <div className="mx-4">|</div> Open Source |
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
      </div>
    </div>
  );
};
