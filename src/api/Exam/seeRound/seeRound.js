import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeRound: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { round, episode, academy } = args;
      try {
        const accs = await prisma.accs({
          where: {
            AND: [{ round }, { episode }, { academy }]
          }
        });
        const taxAccs = await prisma.taxAccs({
          where: {
            AND: [{ round }, { episode }, { academy }]
          }
        });
        const totalAccs = await prisma.totalAccs({
          where: {
            AND: [{ round }, { episode }, { academy }]
          }
        });
        // const taxLaw1s = await prisma.taxLaw1s({
        //   where: {
        //     AND: [{ round }, { academy }]
        //   }
        // });
        // const taxLaw2s = await prisma.taxLaw2s({
        //   where: {
        //     AND: [{ round }, { academy }]
        //   }
        // });
        // return { accs, taxAccs, totalAccs, taxLaw1s, taxLaw2s };
        return { accs, taxAccs, totalAccs };
      } catch (error) {
        console.log("seeRound error: ", error);
      }
    }
  }
};
