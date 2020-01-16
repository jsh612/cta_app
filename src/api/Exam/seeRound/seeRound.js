import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeRound: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { round } = args;
      try {
        const accs = await prisma.accs({ where: { round } });
        const taxAccs = await prisma.taxAccs({ where: { round } });
        const taxLaw1s = await prisma.taxLaw1s({ where: { round } });
        const taxLaw2s = await prisma.taxLaw2s({ where: { round } });
        return { accs, taxAccs, taxLaw1s, taxLaw2s };
      } catch (error) {
        console.log("seeRound error: ", error);
      }
    }
  }
};
