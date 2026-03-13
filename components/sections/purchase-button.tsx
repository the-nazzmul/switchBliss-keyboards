"use client";

import clsx from "clsx";
import { Bounded } from "../bounded";
import { FadeIn } from "../fade-in";
import { LuChevronRight, LuLoader } from "react-icons/lu";
import { useState } from "react";

const PurchaseButton = () => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePurchaseClick = async () => {
    setIsPressed(true);
    //TODO: Implement purchase logic
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsPressed(false);
  };

  return (
    <Bounded>
      <FadeIn
        className="relative mx-auto max-w-7xl px-4 text-center"
        targetChildren
      >
        <p className="mb-6 text-xl font-medium text-gray-700 md:text-2xl">
          Experience Peak Performance
        </p>
        <h2 className="font-bold-slanted mb-8 scroll-pt-6 text-5xl text-gray-900 uppercase md:text-7xl lg:text-8xl">
          Order Yours Now
        </h2>
        <button
          onClick={handlePurchaseClick}
          disabled={isPressed}
          className={clsx(
            "group relative w-full overflow-hidden rounded-full border-8 border-gray-900 bg-linear-to-r/oklch from-sky-300 to-sky-600 px-6 py-6 ease-out focus:ring-24 focus:ring-sky-500/50 focus:outline-none motion-safe:transition-all motion-safe:duration-300 md:border-12 md:px-20 md:py-16",
            "hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/40",
            "active:scale-95",
            isPressed
              ? "scale-95 cursor-not-allowed opacity-80"
              : "cursor-pointer",
          )}
        >
          <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent ease-out group-hover:translate-x-full motion-safe:transition-transform motion-safe:duration-1000" />
          <div className="relative z-10 flex items-center justify-center gap-6 md:gap-8">
            <span className="font-black-slanted text-4xl tracking-wide text-gray-900 uppercase group-hover:-translate-y-1 motion-safe:transition-transform motion-safe:duration-300 md:text-7xl lg:text-9xl">
              {isPressed ? (
                <span className="flex items-center gap-4 md:gap-6">
                  <LuLoader className="size-12 animate-spin text-gray-900 md:size-16" />
                  Loading...
                </span>
              ) : (
                "Buy Vapor75"
              )}
            </span>
            {!isPressed && (
              <div className="hidden group-hover:translate-x-2 group-hover:scale-125 motion-safe:transition-all motion-safe:duration-300 md:block">
                <LuChevronRight className="size-12 text-gray-900 md:size-16" />
              </div>
            )}
          </div>
        </button>
        <div className="mt-12 space-y-3 text-base text-gray-600 md:text-lg">
          <ul className="flex items-center justify-center gap-2 font-bold">
            <li>Free worldwide shipping</li>
            <li>&#9679;</li>
            <li>30-day guarantee</li>
            <li>&#9679;</li>
            <li>2-Years warranty</li>
          </ul>
          <p>Join 10,000+ satisfied customers worldwide</p>
        </div>
      </FadeIn>
    </Bounded>
  );
};

export default PurchaseButton;
