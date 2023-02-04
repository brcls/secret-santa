export default function atribuirAmigos(users) {
  function shuffle(o) {
    for (
      var j, x, i = o.length;
      i;
      j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
  }

  const amigosSecretos = shuffle(users.slice());

  const retorno = amigosSecretos.map((user, index) => {
    const amigoSecreto = amigosSecretos[index + 1] || amigosSecretos[0];
    return {
      ...user,
      amigoSecreto,
    };
  });

  return retorno;
}
