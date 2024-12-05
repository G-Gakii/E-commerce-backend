export const existingUserQuery = "SELECT * FROM users WHERE username=$1";

export const addUserQuery =
  "INSERT INTO users(username,password,role) VALUES($1,$2,$3)";

export const getALLUsers = "SELECT * FROM users";
export const getOneUser = "SELECT * FROM users WHERE id=$1";
export const EditUserdDataQuery =
  "UPDATE users SET username=$1,password=$2,role=$3 WHERE id=$4";

export const deleteUserQUery = "DELETE FROM users WHERE id=$1";
