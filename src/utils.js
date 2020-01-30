import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

// 토큰 생성 함수
export const generateToken = id => {
  // user의 id를 암호화하여 token 생성
  // 암호 해독할떄와 같은 secret key 사용
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//rank 생성 함수
export const createRank = async (
  searchFunc,
  updateFunc,
  round,
  episode,
  academy,
  year,
  newScore,
  oldScore
) => {
  const notRankList = await searchFunc({
    where: {
      AND: [{ round }, { episode }, { academy }, { year }]
    }
  });
  if (notRankList.length === 1) {
    return updateFunc({
      where: {
        id: notRankList[0].id
      },
      data: {
        rank: 1
      }
    });
  }
  const rankList = notRankList.sort((a, b) => b.score - a.score);
  for (let i = 0; i < rankList.length; i++) {
    if (
      rankList[i].score <= newScore ||
      (oldScore && rankList[i].score <= oldScore)
    ) {
      if (i === 0) {
        await updateFunc({
          where: {
            id: rankList[i].id
          },
          data: {
            rank: 1
          }
        });
        rankList[0].rank = 1;
      } else {
        if (rankList[i].score === rankList[i - 1].score) {
          //db에 데이터 입력
          await updateFunc({
            where: {
              id: rankList[i].id
            },
            data: {
              rank: rankList[i - 1].rank
            }
          });
          rankList[i].rank = rankList[i - 1].rank;
        } else {
          await updateFunc({
            where: {
              id: rankList[i].id
            },
            data: {
              rank: i + 1
            }
          });
          rankList[i].rank = i + 1;
        }
      }
    }
  }
};
