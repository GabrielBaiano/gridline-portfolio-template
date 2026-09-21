import React from "react";
import { DotGridSnakeGame } from "./DotGridSnakeGame";

export function HeaderBanner() {
  return (
    <>
      <div className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto relative p-3 flex flex-col container-dashed">
        <DotGridSnakeGame className="w-full sm:min-h-[200px] min-h-[120px] h-full grow" />
      </div>
      <div className="divider-dashed" />
    </>
  );
}
