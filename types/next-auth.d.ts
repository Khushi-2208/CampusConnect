import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: "STUDENT" | "ADMIN";
    };
  }

  interface User {
    id: string;
    role?: "STUDENT" | "ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
  }
}
