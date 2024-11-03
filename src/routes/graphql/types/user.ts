import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { PostType } from './post.js';
import { Context } from './types/interface.js';
import { UserModel } from './types/types.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLString },
    profile: {
      type: ProfileType,
      resolve: async (root: UserModel, args, context: Context) => {
        return await context.prisma.profile.findUnique({
          where: { userId: root.id },
        });
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (root: UserModel, args, context: Context) => {
        return await context.prisma.post.findMany({
          where: { authorId: root.id },
        });
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (root: UserModel, args, context: Context) => {
        return context.prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: root.id,
              },
            },
          },
        });
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (root: UserModel, args, context: Context) => {
        return context.prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: root.id,
              },
            },
          },
        });
      },
    },
  }),
});

export const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});
