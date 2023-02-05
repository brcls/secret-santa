import users from "../models/User.js";
import sortearAmigos from "../utils/sortearAmigos.js";
import validarEmail from "../utils/validarEmail.js";
class UserController {
  static listarUsers = (req, res) => {
    users.find((err, users) => {
      res.status(200).json(users);
    });
  };

  static sortearUsers = (req, res) => {
    users.find((err, users) => {
      const sorteio = sortearAmigos(JSON.parse(JSON.stringify(users)));

      if (sorteio.length % 2 !== 0) {
        res.status(400).send({ message: "Número de participantes inválido" });
      } else {
        const amigosSorteados = sorteio.map((amigo) => {
          const { nome, email, amigoSecreto } = amigo;

          const templateParams = {
            user_name: nome,
            to_email: email,
            secret_friend: amigoSecreto.nome,
          };

          return templateParams;
        });

        res.status(200).send(amigosSorteados);
      }
    });
  };

  static listarUserPorId = (req, res) => {
    const id = req.params.id;

    users.findById(id, (err, users) => {
      if (err) {
        res.status(400).send({ message: `${err} - Id do user não localizado` });
      } else {
        res.status(200).send(users);
      }
    });
  };

  static cadastrarUser = (req, res) => {
    let user = new users(req.body);

    validarEmail(user.email, (err) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        user.save((err) => {
          if (err) {
            res.status(500).send(err.message);
          } else {
            res.status(201).send(user.toJSON());
          }
        });
      }
    });
  };

  static atualizarUser = (req, res) => {
    const id = req.params.id;

    users.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: "User atualizado com sucesso" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static excluirUser = (req, res) => {
    const id = req.params.id;

    users.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "User removido com sucesso" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };
}

export default UserController;
