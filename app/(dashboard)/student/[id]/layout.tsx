import React from "react";
import Tab from "./components/tab";

interface Props {
    params: {
        id: string;
    };
    children: React.ReactNode;
}
function Layout({ params, children }: Props) {
    return (
        <div>
            <Tab params={params} />
            {children}
        </div>
    );
}

export default Layout;
