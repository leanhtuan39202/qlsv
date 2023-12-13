import React from "react";
import Drawer from "../components/drawer";
import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";
import { getRole } from "./lib/prisma/user";
import { Role } from "@prisma/client";

interface Props {
    children: React.ReactNode;
}
async function Layout({ children }: Props) {
    const session = (await getServerSession(authOption as any)) as any;
    const role = await getRole(session?.user?.name as string);

    if (!session) {
        return redirect("/login");
    }

    if (role === Role.STUDENT) {
        return redirect("/studentpage");
    }
    if (role === Role.INSTRUCTOR) {
        return redirect("/instructorpage");
    }
    return (
        <div>
            <Drawer>{children}</Drawer>
        </div>
    );
}

export default Layout;
