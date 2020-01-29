import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeNotice: async (_, args, { request, isAuthenticated }) => {
      // isAuthenticated(request);
      const { name } = args;
      try {
        const notice = await prisma.notices({ name });
        console.log("출력값", notice);
        return notice;
      } catch (error) {
        console.log("공지열람 오류::", error);
      }
    }
  }
};
