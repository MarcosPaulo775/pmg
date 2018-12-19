export class User {
  _id?: string
  username?: string;
  userpass?: string;
  fullname?: string;
  email?: string;
  createdby?: string;
  permissions?: string[];
  login_time?: number;
  user_id?: string; 
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

export class Permissoes {
  Admin_User?: boolean;
  Patchplanner?: boolean;
  Manage_Chains?: boolean;
  Manage_Users?: boolean;
  Manage_Scopes?: boolean;
  Manage_Templates?: boolean;
  Manage_Whitepapers?: boolean;
  Manage_Share?: boolean;
  Manage_Assets?: boolean;
  External_project_user?: boolean;
  Manage_Jobs?: boolean;
  May_Upload?: boolean;
  May_Delete_Jackets_In_Kiosk?: boolean;
}
