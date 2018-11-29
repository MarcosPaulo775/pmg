export class User {
  _id?: string
  username?: string;
  userpass?: string;
  fullname?: string;
  email?: string;
  createdby?: string;
  permissions?: string[];
  error_code?: string;
  error?: string;
}

export class Avatar {
  _id?: string;
  data?: string;
  id?: string;
  error_code?: string;
  error?: string;
}
