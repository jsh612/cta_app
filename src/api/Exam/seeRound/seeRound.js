import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeRound: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { round, academy } = args;
      try {
        const accs = await prisma.accs({
          where: {
            AND: [{ round }, { academy }]
          }
        });
        const taxAccs = await prisma.taxAccs({
          where: {
            AND: [{ round }, { academy }]
          }
        });
        const taxLaw1s = await prisma.taxLaw1s({
          where: {
            AND: [{ round }, { academy }]
          }
        });
        const taxLaw2s = await prisma.taxLaw2s({
          where: {
            AND: [{ round }, { academy }]
          }
        });
        return { accs, taxAccs, taxLaw1s, taxLaw2s };
      } catch (error) {
        console.log("seeRound error: ", error);
      }
    }
  }
};
