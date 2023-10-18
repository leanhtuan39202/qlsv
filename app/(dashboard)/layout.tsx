import React from "react";
import Drawer from "../components/drawer";
import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";

interface Props {
    children: React.ReactNode;
}
async function Layout({ children }: Props) {
    const session = await getServerSession(authOption);

    if (!session) {
        return redirect("/login");
    }

    return (
        <div>
            <Drawer>{children}</Drawer>
        </div>
    );
}

export default Layout;
