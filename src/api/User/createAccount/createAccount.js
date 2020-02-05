import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, password } = args;
      const enPassword = await bcrypt.hash(password, 10);
      const exists = await prisma.$exists.user({
        username
      });
      if (exists) {
        // throw Error("해당 아이디가 존재합니다~~.");
        return false;
      }
      try {
        const user = await prisma.createUser({
          username,
          password: enPassword
        });
        return user;
      } catch (error) {
        // console.log("createAccount 에러:", error);
        return false;
      }
    }
  }
};
