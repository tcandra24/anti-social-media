"use client";

import { UserProviderContext } from "@/providers/UserProvider";
import { useContext } from "react";

function UseUser() {
  return useContext(UserProviderContext);
}

export default UseUser;
