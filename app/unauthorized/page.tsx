// app/unauthorized/page.tsx
"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export default function UnauthorizedPage() {
  const router = useRouter();

  const goHome = () => {
    router.push("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h2>Görevlerinizi listelemek ve yönetmek için giriş yapmalısınız.</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={goHome}
        className="mt-4"
      >
        Giriş Yap
      </Button>
    </div>
  );
}
