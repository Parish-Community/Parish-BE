export class CreateAccountReqDto {
  phonenumber: string;
  email: string;
  password: string;
  fullname: string;
  roleId?: number;
}

export class SigninReqDto {
  email: string;
  password: string;
}

export class RegisterReqDto {
  email: string;
  password: string;
  phonenumber: string;
  confirmPassword: string;
  fullname: string;
}
