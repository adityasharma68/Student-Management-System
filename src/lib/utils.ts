import { auth } from "@clerk/nextjs/server";

export const fetchAuthData = async () => {
  const authData = await auth();
  if (authData) {
    const userId = authData.userId ?? undefined;
    const userRole = (authData.sessionClaims?.metadata as { role?: string })
      ?.role;
    console.log("Fetched User ID:", userId);
    console.log("Fetched User Role:", userRole);
    return { userId, userRole };
  } else {
    console.log("No auth data found.");
    return { userId: undefined, userRole: undefined };
  }
};

export const getRole = async () => {
  const { userRole } = await fetchAuthData();
  return userRole;
};

export const getUserId = async () => {
  const { userId } = await fetchAuthData();
  return userId;
};
