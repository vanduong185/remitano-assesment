export enum Field {
  EMAIL = "email",
  PASSWORD = "password",
}

export type FormField = {
  [Field.EMAIL]: string;
  [Field.PASSWORD]: string;
};
