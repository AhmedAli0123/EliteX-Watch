// "use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   // const { data: session, status } = useSession();
//   // const router = useRouter();

//   // useEffect(() => {
//   //   if (status === "loading") return;
//   //   if (!session) {
//   //     router.push("/admin/login");
//   //   }
//   // }, [session, status, router]);

//   if (status === "loading") return <p>Loading...</p>;

//   return session ? <>{children}</> : null;
// }
