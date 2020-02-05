import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeNotice: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { name } = args;
      try {
        const notice = await prisma.notices({ name });
        return notice;
      } catch (error) {
        // console.log("공지열람 오류::", error);
        // null;
      }
    }
  }
};
