import { useEffect } from "react";
export default function Logout() {
  useEffect(() => {
    localStorage.removeItem("userId");
    window.location.href = "/login";
  }, []);

  return null;
}
