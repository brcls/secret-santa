import api from "../api.js";

async function getUsers() {
  return api.get("/users").then(({ data }) => {
    return data;
  });
}

const users = await getUsers();

function shuffle(o) {
  for (
    var j, x, i = o.length;
    i;
    j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
}

const amigosSecretos = shuffle(users.slice());

const amigosAtribuidos = amigosSecretos.map((user, index) => {
  const amigoSecreto = amigosSecretos[index + 1] || amigosSecretos[0];
  return {
    ...user,
    amigoSecreto,
  };
});

console.log(amigosAtribuidos);

export default amigosAtribuidos;
