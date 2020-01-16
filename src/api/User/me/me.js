import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      try {
        const me = await prisma.user({ id: user.id });
        return me;
      } catch (error) {
        console.log("me error:", error);
      }
    }
  }
};
