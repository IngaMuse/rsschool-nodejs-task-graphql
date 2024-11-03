import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Context } from './types/types/interface.js';
import {
  UserDto,
  UserModel,
  PostDto,
  PostModel,
  ProfileDto,
  ProfileModel
} from './types/types/types.js';
import { CreatePostInput, PostType } from './types/post.js';
import { CreateUserInput, UserType } from './types/user.js';
import { CreateProfileInput, ProfileType } from './types/profile.js';

export const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: { dto: { type: CreateUserInput } },
      resolve: async (
        root,
        args: { dto: UserDto },
        context: Context,
      ): Promise<UserModel> => await context.prisma.user.create({ data: args.dto }),
    },

    createPost: {
      type: PostType,
      args: { dto: { type: new GraphQLNonNull(CreatePostInput) } },
      resolve: async (
        root,
        args: { dto: PostDto },
        context: Context,
      ): Promise<PostModel> => await context.prisma.post.create({ data: args.dto }),
    },

    createProfile: {
      type: ProfileType,
      args: { dto: { type: CreateProfileInput } },
      resolve: async (
        root,
        args: { dto: ProfileDto },
        context: Context,
      ): Promise<ProfileModel> => await context.prisma.profile.create({ data: args.dto }),
    },
  },
});
