import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";
require("dotenv").config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const verifyUser = async (payload, done) => {
  try {
    // 해당 유저가 있는지 없는지를 찾는다.
    // console.log("passport.js / verifyUser / payload: ", payload);
    // payload --> { id: 'ck344qfgit8fo0b092yvzx58x', iat: 1574245227 }
    const user = await prisma.user({ id: payload.id });
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    console.log("jwt 인증오류 : ", error);
    return done(error, false);
  }
};

passport.use(new JwtStrategy(jwtOptions, verifyUser));

export const authenticateJwt = (req, res, next) =>
  //1. custom callback (passport.authenticate 함수의)
  //  - a custom callback can be provided to allow the application to handle success or failure.
  //  - 즉, 인증단계 이후에 실행된다.
  //  - http://www.passportjs.org/docs/authenticate/
  //  - 위의 주소에서 custom callback 내용 보기
  //2. passport.authenticate() 은 함수를 리턴하고 바로 실행(IIFE 문법 / 즉시실행함수)
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (user) {
      // verifyUser에서 사용자를 받아온 후에, req에 붙여 준다.
      req.user = user;
    }
    next();
  })(req, res, next);

passport.initialize(); //passport 구동
// # passport 인증 실행 과정
// 서버에서 전달되는 모든 요청은 이 authenticateJwt 함수를 통과한다.
// authenticateJwt함수에서는 passport.authenticate("jwt") 함수를 실행함.
// 이 함수는 jwtOptions의 설정에 따라  jwt토큰을 추출함.
// 토큰이 추출되면 verifyUser를 실행함
// verifyUser의 payload에서는 토큰에서해석된 id를 받아서 user를 찾아 리턴함.
// 그리고 passport.authenticate 함수 내부의 콜백을 실행하여, 사용자가 있으면 그 사용자를
// req에 추가해 준다.
