import React from "react";
import AccountTable from "./components/accountTable";
import { getUserByRole } from "../lib/prisma/user";
import { Role } from "@prisma/client";

async function Page() {
    const studentAccount = await getUserByRole(Role.STUDENT);

    return <AccountTable data={studentAccount} />;
}

export default Page;
