import { NextResponse } from "next/server";
import { responseType } from "@/types/product";

export async function fetchProducts() {
  const url = "https://dummyjson.com/products";

  const res = await fetch(url);

  const data = await res.json();

  return NextResponse.json<responseType>(data);
}
