import { prisma } from "../../../../generated/prisma-client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, password } = args;
      const enPassword = await bcrypt.hash(password, 10);
      const user = await prisma.createUser({
        username,
        password: enPassword
      });
      return user;
    }
  }
};
