export type TIngredient = {
  readonly _id: string,
  readonly name: string,
  readonly type: string,
  readonly proteins: number,
  readonly fat: number,
  readonly carbohydrates: number,
  readonly calories: number,
  readonly price: number,
  readonly image: string,
  readonly image_mobile: string,
  readonly image_large: string,
  readonly __v: number,
  constructorId?: string,
};

export type TUser = {
  email: string,
  name: string,
  password?: string,
};

// export type TTokens = {
//   accessToken: string,
//   refreshToken: string,
// }

export type TOrder = {
  ingredients: [] | TIngredient[],
  _id: string,
  owner: {
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string
  },
  status: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  number: number,
  price: number,
}

export type TBurgerIngredientsState = {
  list: [] | TIngredient[],
  error: null | string,
  isRequest: boolean,
  isFailed: boolean,
};

export type TIngredientDetailsState = {
  item: null | TIngredient,
};

export type TBurgerConstructorState = {
  buns: null | TIngredient,
  ingredients: [] | TIngredient[],
};

export type TOrderDetailsState = {
  info: {
    success: boolean,
    name: null | string,
    number: null | number,
    ingredients: [] | string[],
  },
  error: null | string,
  isRequest: boolean,
  isFailed: boolean,
};

export type TAuthState = {
  isRegistrRequest: boolean,
  isRegistrSuccess: boolean,
  isRegistrError: boolean,

  isLoginRequest: boolean,
  isLoginSuccess: boolean,
  isLoginError: boolean,

  isLogoutRequest: boolean,
  isLogoutSuccess: boolean,
  isLogoutError: boolean,

  isForgotPasswordRequest: boolean,
  isForgotPasswordSuccess: boolean,
  isForgotPasswordError: boolean,

  isResetPasswordRequest: boolean,
  isResetPasswordSuccess: boolean,
  isResetPasswordError: boolean,

  isGetUserRequest: boolean,
  isGetUserSuccess: boolean,
  isGetUserError: boolean,

  isUpdateUserRequest: boolean,
  isUpdateUserSuccess: boolean,
  isUpdateUserError: boolean,

  user: null | TUser,
};

// export type TStore = {
//   burgerIngredients: TBurgerIngredientsState,
//   ingredientDetails: TIngredientDetailsState,
//   burgerConstructor: TBurgerConstructorState,
//   orderDetails: TOrderDetailsState,
//   auth: TAuthState,
// }