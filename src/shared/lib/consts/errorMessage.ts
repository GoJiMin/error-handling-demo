type ErrorMessage = Record<string, string>;

export const SERVER_ERROR_MESSAGE: ErrorMessage = {
  // 로그인 관련 에러 코드
  TOKEN_NOT_FOUND: "서비스 이용에 로그인이 필요해요.",
  TOKEN_EXPIRED: "토큰이 만료되었어요. 다시 로그인해주세요.",
  PASSWORD_INVALID: "비밀번호를 다시 입력해주세요.",

  // 게시물
  POST_NOT_FOUND: "존재하지 않는 게시글이에요.",

  // 서버 내부적인 에러
  INTERNAL_SERVER_ERROR: "서버 내부에 에러가 발생했습니다.",

  // 유저 에러
  USER_NOT_FOUND: "유저 정보를 찾을 수 없어요.",

  // 상품 에러
  PRODUCTS_NOT_FOUND: "상품 정보를 찾을 수 없어요.",
  PRODUCTS_어떤에러: "에러를 여기 추가.",
};

export const ERROR_MESSAGE: ErrorMessage = {
  preventEmptyTitle: "제목은 비어있을 수 없어요.",
  invalidInput: "올바르지 않은 입력이에요.",
  invalidType: "지원하지 않는 파일 형식이에요.",
};
