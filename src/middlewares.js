// 여러 resolver 에서 로그인 여부확인시 사용
export const isAuthenticated = request => {
  // request 객체의 user 여부를 통해 로그인 확인
  if (!request.user) {
    throw Error("로그인이 필요합니다.");
  }
  return;
};
