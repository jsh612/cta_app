import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    login: async (_, args) => {
      const { username, password } = args;
      const user = await prisma.user({ username });
      if (!user) {
        throw new Error("No such user found");
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error("Invalid password");
      } else {
        const token = generateToken(user.id);
        return token;
      }
    }
  }
};
