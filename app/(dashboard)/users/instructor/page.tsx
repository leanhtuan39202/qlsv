import React from "react";
import { getUserByRole } from "../../lib/prisma/user";
import { Role } from "@prisma/client";
import AccountTable from "../components/accountTable";

async function Page() {
    const data = await getUserByRole(Role.INSTRUCTOR);

    return <AccountTable data={data} />;
}

export default Page;
