import { getStudentById } from "@/app/(dashboard)/lib/prisma/student";
import { getTermByDepartmentId } from "@/app/(dashboard)/lib/prisma/term";
import { authOption } from "@/app/api/auth/[...nextauth]/option";
import { getServerSession } from "next-auth";
import React from "react";
import ListTerm from "./listTerm";

async function Page() {
    const session = (await getServerSession(authOption as any)) as any;
    const studentInfo = await getStudentById(session?.user?.name as string);
    const term = await getTermByDepartmentId(
        studentInfo?.department?.id as string
    );
    return (
        <div className="w-full min-h-screen p-6 ">
            <h1 className="text-2xl font-bold">Đăng kí học phần</h1>
            <ListTerm term={term} />
        </div>
    );
}

export default Page;
