import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

//definições dos tipos
const typeDefs = `#graphql

#define quais atributos de cada livro poderão ser pedidos em uma query
type Livro {
  titulo: String
  descricao: String
  autor: String
}
#define as queries que podem ser executadas
type Query {
  #query "livros" retorna um array contendo zero ou mais livros
  livros: [Livro]
}
`;

//array de livros
const livros = [
    {
      titulo: "A menina que roubava livros",
      descricao: "Traços de uma sobrevivente: a mãe comunista, perseguida pelo nazismo, envia Liesel e o irmão para o subúrbio pobre de uma cidade alemã, onde um casal se dispõe a adotá-los por dinheiro.",
      autor: "Markus Zusak",
    },
    {
      titulo: "Alice no País das Maravilhas",
      descricao: "Ainda garotinha, Alice Kingsleigh visitou um lugar mágico pela primeira vez e não tinha mais lembranças sobre o local a não ser em seus sonhos. Em uma festa da nobreza, a jovem vê um coelho branco. Alice o segue e cai em um buraco, indo parar em um mundo estranho: o País das Maravilhas.",
      autor: "Lewis Carroll",
    },
    {
      titulo: "A Metamorfose",
      descricao: "Kafka descreve o caixeiro viajante Gregor Samsa, que abandona as suas vontades e desejos para sustentar a família e pagar a dívida dos pais.",
      autor: "Franz Kafka",
    },
    {
      titulo: "1984",
      descricao: "A narrativa revela um futuro distópico em que o Estado é extremamente autoritário e impõe um regime de vigilância sobre a sociedade. O romance acontece na cidade que um dia fora Londres, na fictícia Oceânia, território dominado pela repressão e pelo medo.",
      autor: "George Orwell",
    },
  ];

  //define como cada tipo vai ser requisitado, de acordo com o schema
const resolvers = {
    Query: {
      livros: () => livros,
    },
  };

const server = new ApolloServer({
    typeDefs,
    csrfPrevention: false,
    resolvers,
  });
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  console.log(`Servidor rodando: ${url}`);