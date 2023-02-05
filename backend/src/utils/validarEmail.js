import users from "../models/User.js";

export default function validarEmail(email, callback) {
  users.findOne({ email: email }, (err, res) => {
    if (res && res.email === email) {
      callback(new Error("Email já cadastrado"));
    } else {
      callback(null);
    }
  });
}
