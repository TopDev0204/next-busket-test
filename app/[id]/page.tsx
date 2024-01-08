"use client";

import { useEffect } from "react";
import { gaEventEmitter } from "@/utils/gaEvents";
import { viewItemEventData } from "@/mocks/eventData";

export default function Page({ params }: { params: { id: string } }) {
  useEffect(() => {
    const gaEmitter = gaEventEmitter();
    gaEmitter.track("view_item", viewItemEventData);
  }, []);

  return <></>;
}
