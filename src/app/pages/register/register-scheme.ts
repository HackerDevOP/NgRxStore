import { minLength, required, schema, validate } from "@angular/forms/signals"

export type RegisterModel = {
  username: "",
    email: "",
    password: "",
    confirmpassword: ""
}

export const registerSchema = schema<RegisterModel>((rootPath) => {
  required(rootPath.username, { message: 'required' }),
    required(rootPath.email, { message: 'required' }),
    required(rootPath.password, { message: 'required' }),
    required(rootPath.confirmpassword, { message: 'required' }),
    minLength(rootPath.password, 6, { message: 'required min 6 length' })


  validate(rootPath.confirmpassword, ({ value, valueOf }) => {
    const password = valueOf(rootPath.password)
    const confirmPassword = value();

    if (!password) {
      return null;
    }
    if (password !== confirmPassword) {
      return {
        kind: 'passwordMismatch',
        message: 'Passwords do not match'
      };
    }
    return null;
  })
}
)
