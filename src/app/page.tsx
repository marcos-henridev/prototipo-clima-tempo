"use client";

import { useState } from "react";
import ClimaCard from "@/componentes/clima-card/clima-card";
import Home from "@/componentes/home/home";
import PrevisaoHoras from "@/componentes/previsao-horas/previsao-horas";
import { useClima } from "@/data/hookcustumer";
import styles from "./page.module.css";

export default function Page() {
  const [cidade, setCidade] = useState("");
  const { dados, carregando, erro } = useClima(cidade);

  return (
    <main className={styles.page}>
      <Home onBuscar={setCidade} carregando={carregando}>
        <ClimaCard dados={dados} carregando={carregando} erro={erro} />
        {dados && !carregando && <PrevisaoHoras horas={dados.horas} />}
      </Home>
    </main>
  );
}
