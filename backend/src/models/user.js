const db = require("../../config");

const createUser = (payload) => {
  return db
    .promise()
    .query("INSERT INTO user SET ?", [payload])
    .then(([res]) => res);
};
const findAllUsers = () => {
  return db
    .promise()
    .query(
      "SELECT u.id, u.username, u.firstname, u.lastname, r.type as role from user as u join role as r on r.id = u.role_id"
    )
    .then(([res]) => res);
};

const findUserByEmail = (email) => {
  return db
    .promise()
    .query("SELECT * FROM user where email = ?", [email])
    .then(([res]) => res);
};

const findUserByUsername = (username) => {
  return db
    .promise()
    .query("SELECT * FROM user where username = ?", [username])
    .then(([res]) => res);
};

const findUserById = (id) => {
  return db
    .promise()
    .query("SELECT firstname, lastname, email FROM user where id = ?", [
      Number(id),
    ])
    .then(([res]) => res);
};
const findRoleByUser = (id) => {
  return db
    .promise()
    .query(
      "SELECT role.id FROM role INNER JOIN user ON role.id = user.role_id where user.id = ?",
      [Number(id)]
    )
    .then(([res]) => res);
};

const updateUser = (payload, id) => {
  return db
    .promise()
    .query("UPDATE user SET ? where id = ?", [payload, Number(id)])
    .then(([res]) => res);
};

const deleteUser = (id) => {
  return db.promise().query("DELETE FROM user WHERE id = ?", [Number(id)]);
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByUsername,
  findUserById,
  findRoleByUser,
  updateUser,
  findAllUsers,
  deleteUser,
};
