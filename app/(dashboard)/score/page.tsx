import React from "react";
import { getAllInfo } from "../lib/prisma/term";
import ScoreScreen from "./screen";

async function Page() {
    const allterm = await getAllInfo();

    return <ScoreScreen term={allterm} />;
}

export default Page;
