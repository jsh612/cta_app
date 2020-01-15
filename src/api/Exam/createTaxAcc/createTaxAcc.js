import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createTaxAcc: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { score, round } = args;
      const { user } = request;
      if (score === "") {
        throw Error("점수를 입력해 주세요");
      }
      const exists = await prisma.user({ id: user.id }).taxAccs({
        where: {
          round
        }
      });
      if (exists.length !== 0) {
        //이미 작성한 점수가 존재하는 경우 기존 점수 수정
        const taxAcc = await prisma.updateTaxAcc({
          data: {
            score
          },
          where: {
            id: exists[0].id
          }
        });
        return taxAcc;
      }
      const taxAcc = await prisma.createTaxAcc({
        score,
        round,
        user: {
          connect: {
            id: user.id
          }
        }
      });
      return taxAcc;
    }
  }
};
