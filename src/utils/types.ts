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
  constructorId?: number,
};

export type TBurgerIngredients = {
  list: [] | TIngredient[],
  error: null | string,
  isRequest: boolean,
  isFailed: boolean,
};

export type TIngredientDetails = {
  item: null | TIngredient,
};

export type TBurgerConstructor = {
  buns: null | TIngredient,
  ingredients: [] | TIngredient[],
};

export type TOrderDetails = {
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

export type TUser = {
  email: string,
  name: string,
  password?: string,
};

export type TAuth = {
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

export type TStore = {
  burgerIngredients: TBurgerIngredients,
  ingredientDetails: TIngredientDetails,
  burgerConstructor: TBurgerConstructor,
  orderDetails: TOrderDetails,
  auth: TAuth,
}