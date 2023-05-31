export enum Field {
  EMAIL = "email",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
}

export type FormField = {
  [Field.EMAIL]: string;
  [Field.PASSWORD]: string;
  [Field.CONFIRM_PASSWORD]: string;
};
