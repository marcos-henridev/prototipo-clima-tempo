"use client";

import { useEffect } from "react";

export default function RegisterSw() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("serviceWorker registrado"))
        .catch((err) => console.error("erro ao registrar service Worker", err));
    }
  }, []);
  return null;
}
