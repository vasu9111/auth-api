const errorCodes = {
  EMAIL_REQUIRED: {
    httpStatusCode: 400,
    body: {
      code: "email_required",
      message: "Email ID must be required",
    },
  },
  EMAIL_INVALID: {
    httpStatusCode: 400,
    body: {
      code: "email_invalid",
      message: "UseEmail ID is in invalid formatr not found.",
    },
  },
  USER_NOT_FOUND: {
    httpStatusCode: 400,
    body: {
      code: "user_not_found",
      message: "User not found.",
    },
  },
  PASSWORD_REQUIRE: {
    httpStatusCode: 400,
    body: {
      code: "password_require",
      message: "password must be required",
    },
  },
  INVALID_PASSWORD: {
    httpStatusCode: 400,
    body: {
      code: "invalid_password",
      message: "invalid password",
    },
  },
  NAME_REQUIRED: {
    httpStatusCode: 400,
    body: {
      code: "name_required",
      message: "Name must be required",
    },
  },
  NAME_INVALID: {
    httpStatusCode: 400,
    body: {
      code: "name_invalid",
      message: "Name is invalid",
    },
  },
  USER_EXIST: {
    httpStatusCode: 409,
    body: {
      code: "user_already_exist",
      message: "User already exist.",
    },
  },
  PASSWORD_INVALID: {
    httpStatusCode: 409,
    body: {
      code: "password_invalid",
      message: "password invalid.",
    },
  },
  REFRESH_TOKEN_MISSING: {
    httpStatusCode: 401,
    body: {
      code: "refresh_token_missing",
      message: "refresh token missing",
    },
  },
  TOKEN_INVALID: {
    httpStatusCode: 401,
    body: {
      code: "token_invalid",
      message: "invalid Refresh Token ",
    },
  },
  REFRESH_TOKEN_EXPIRED: {
    httpStatusCode: 401,
    body: {
      code: "refresh_token_expired",
      message: "Refresh token expired or in use",
    },
  },
  TOKEN_MISSING: {
    httpStatusCode: 401,
    body: {
      code: "TOKEN_MISSING",
      message: "token missing",
    },
  },
  ACCESS_DENIED: {
    httpStatusCode: 403,
    body: {
      code: "access_denied",
      message: "Access denied. Please log in",
    },
  },
};
export default errorCodes;
