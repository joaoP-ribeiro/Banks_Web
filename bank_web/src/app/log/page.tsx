import React from "react";
import { AuthProvider } from "../context/context";
import ApiPage from "../api/page";

export default function Navigation() {
  return (
    <AuthProvider>
        <ApiPage/>
    </AuthProvider>
  );
}