"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";

export default function Home() {
  return (
    <div className={`${styles["main-page"]}`}>
      This is a test text for the main page
    </div>
  );
}
