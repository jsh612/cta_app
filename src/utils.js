import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

// 토큰 생성 함수
export const generateToken = id => {
  // user의 id를 암호화하여 token 생성
  // 암호 해독할떄와 같은 secret key 사용
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
