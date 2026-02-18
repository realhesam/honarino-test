"use client";

import { AuthService } from "@/lib/modules/auth/auth.service";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function Page()
{
    useEffect(() => {
        AuthService.logout();
        return redirect("/");
    }, []);
}

export default Page;