"use client"; // ⚠️ IMPORTANTE para usar hooks no App Router

import { useEffect } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { useRouter } from "next/navigation";

// Main content layout component
export default function Content({ children, userId }: { children: React.ReactNode, userId: string }) {
    const router = useRouter();

    useEffect(() => {
        router.push(`/${userId}`);
    }, []);
    
    return (
    <ProtectedRoute>
        {children}
      {/* Content can go here if needed */}
    </ProtectedRoute>
    );
}