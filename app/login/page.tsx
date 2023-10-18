import { getServerSession } from "next-auth";
import LoginComponent from "./loginComponent";
import { authOption } from "../api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";
async function Page() {
    const session = await getServerSession(authOption as any);
    if (session) {
        redirect("/");
    }
    return <LoginComponent />;
}

export default Page;
