const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const resolvers = {
  Query: {
    info: () => `This is the API of a superhero ting`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
  },
  Mutation: {
    post: (parent, args, context, info) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
      return newLink;
    },
    updateLink: (parent, args, context, info) => {
      const link = context.prisma.link.update({
        data: {
          url: args.url,
          description: args.description,
        },
      });
      return link;
    },
    deleteLink: (parent, args) => {
      const link = links.find((u) => u.id === args.id);
      if (!link) {
        throw new Error(`Couldn't find link with id: ${id}`);
      }
      console.log(`deleting link with ID:${link.id}`);
      delete link;
    },
  },
};

const fs = require("fs");
const path = require("path");
const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
