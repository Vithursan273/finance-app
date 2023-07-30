"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const handleRedirect = (url) => {
    router.push(url);
  };

  return (
    <div className={`${styles["default-page"]}`}>
      <div class="flex flex-col justify-center px-6 py-12 lg:px-8">
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div class="py-10">
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={(e) => handleRedirect("/my-finances/expenses")}
            >
              My Expenses
            </button>
          </div>
          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              My Revenue Streams
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
