import React from "react";
import Navbar from "../components/navbar";
import { getServerSession } from "next-auth";
import { getRole } from "../(dashboard)/lib/prisma/user";
import { redirect } from "next/navigation";
import { authOption } from "../api/auth/[...nextauth]/option";

async function Layout({ children }: { children: React.ReactNode }) {
    const session = (await getServerSession(authOption as any)) as any;
    const role = await getRole(session?.user?.name as string);

    if (!session || !role) {
        return redirect("/login");
    }

    return (
        <div className="w-full h-screen flex flex-col items-center">
            <Navbar />
            <div className="w-9/12  h-full">{children}</div>
        </div>
    );
}

export default Layout;
