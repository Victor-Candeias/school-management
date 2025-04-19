"use client";

import { useState, ReactNode } from "react";
import TopBar from "./TopBar";
import StudentsTopBar from "./StudentsTopBar";
import Sidebar from "./Sidebar";
import style from "./Layout.module.css";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Layout({ children }: { children: ReactNode }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	/*
			<ProtectedRoute>
			<div className="h-screen overflow-hidden">
				<TopBar
					onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
				/>
				<div className="pt-18 flex h-[calc(100vh-3rem)]">
					<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
					<main className={style.content}>{children}</main>
				</div>
			</div>
		</ProtectedRoute>
	*/
	return (
		<ProtectedRoute>
			{/* main content */}
			<div className="h-screen overflow-hidden">
				{/* main topbar */}
				<TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
				{/* second content */}
				<div className="pt-18 flex h-[calc(100vh-3rem)]">
					{/* side bar */}
					<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
					{/* third bar */}
					<div className="h-screen overflow-hidden w-full">
						<div className="flex flex-col h-full">
							<div className="shrink-0">
								<StudentsTopBar />
							</div>
							<main className={`${style.content} pb-8`}>{children}</main>
						</div>
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
}
