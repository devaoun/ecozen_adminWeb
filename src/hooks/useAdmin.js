import { useContext } from "react";
import { AuthAdminContext } from "../context/AdminContext";

export default function useAdmin() {
    return useContext(AuthAdminContext)
}