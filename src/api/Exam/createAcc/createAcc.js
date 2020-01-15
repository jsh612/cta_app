import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAcc: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { score, round } = args;
      const { user } = request;
      if (score === "") {
        throw Error("점수를 입력해 주세요");
      }
      const exists = await prisma.user({ id: user.id }).accs({
        where: {
          round
        }
      });
      if (exists.length !== 0) {
        //이미 작성한 점수가 존재하는 경우 기존 점수 수정
        const acc = await prisma.updateAcc({
          data: {
            score
          },
          where: {
            id: exists[0].id
          }
        });
        return acc;
      }
      const acc = await prisma.createAcc({
        score,
        round,
        user: {
          connect: {
            id: user.id
          }
        }
      });
      return acc;
    }
  }
};
