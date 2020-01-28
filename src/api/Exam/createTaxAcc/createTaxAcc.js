import { prisma } from "../../../../generated/prisma-client";
import { createRank } from "../../../utils";

export default {
  Mutation: {
    createTaxAcc: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { score, round, episode, academy } = args;
      const { user } = request;
      if (score === "") {
        throw Error("점수를 입력해 주세요");
      }
      const exists = await prisma.user({ id: user.id }).taxAccs({
        where: {
          AND: [{ round }, { episode }, { academy }]
        }
      });
      const existOther = await prisma.user({ id: user.id }).accs({
        where: {
          AND: [{ round }, { episode }, { academy }]
        }
      });
      if (existOther.length !== 0) {
        const sumScore = existOther[0].score + score;
        const totalExists = await prisma.user({ id: user.id }).totalAccs({
          where: {
            AND: [{ round }, { episode }, { academy }]
          }
        });
        if (totalExists.length !== 0) {
          await prisma.updateTotalAcc({
            data: {
              score: sumScore
            },
            where: {
              id: totalExists[0].id
            }
          });
        } else {
          await prisma.createTotalAcc({
            score: sumScore,
            round,
            episode,
            academy,
            user: {
              connect: {
                id: user.id
              }
            }
          });
        }
      }
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
        createRank(
          prisma.taxAccs,
          prisma.updateTaxAcc,
          round,
          episode,
          academy
        );
        return taxAcc;
      }
      const taxAcc = await prisma.createTaxAcc({
        score,
        round,
        episode,
        academy,
        user: {
          connect: {
            id: user.id
          }
        }
      });
      createRank(prisma.taxAccs, prisma.updateTaxAcc, round, episode, academy);
      return taxAcc;
    }
  }
};
