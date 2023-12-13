import React from "react";
import { getClassById } from "../../lib/prisma/classes";
import ClassInfoScreen from "./screen";

interface Props {
    params: {
        id: string;
    };
}
async function Page({ params }: Props) {
    const { id } = params;

    const classes = await getClassById(id);

    return <ClassInfoScreen classes={classes} />;
}

export default Page;
