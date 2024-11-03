import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { Context } from './types/types/interface.js';
import {
  UserDto,
  UserModel,
  PostDto,
  PostModel,
  ProfileDto,
  ProfileModel,
} from './types/types/types.js';
import { ChangePostInput, CreatePostInput, PostType } from './types/post.js';
import { ChangeUserInput, CreateUserInput, UserType } from './types/user.js';
import { ChangeProfileInput, CreateProfileInput, ProfileType } from './types/profile.js';
import { UUID } from 'crypto';
import { UUIDType } from './types/uuid.js';

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
    deleteUser: {
      type: new GraphQLNonNull(UUIDType),
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (root, { id }: { id: UUID }, context: Context) => {
        await context.prisma.user.delete({
          where: { id },
        });
        return id;
      },
    },
    changeUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInput) },
      },
      resolve: async (
        root,
        { id, dto }: { id: UUID; dto: UserDto },
        { prisma }: Context,
      ) =>
        await prisma.user.update({
          where: { id },
          data: dto,
        }),
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
    deletePost: {
      type: new GraphQLNonNull(UUIDType),
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (root, { id }: { id: UUID }, context: Context) => {
        await context.prisma.post.delete({
          where: { id },
        });
        return id;
      },
    },
    changePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePostInput) },
      },
      resolve: async (
        root,
        { id, dto }: { id: UUID; dto: PostDto },
        { prisma }: Context,
      ) =>
        await prisma.post.update({
          where: { id },
          data: dto,
        }),
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
    deleteProfile: {
      type: new GraphQLNonNull(UUIDType),
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (root, { id }: { id: UUID }, context: Context) => {
        await context.prisma.profile.delete({
          where: { id },
        });
        return id;
      },
    },
    changeProfile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInput) },
      },
      resolve: async (
        root,
        { id, dto }: { id: UUID; dto: ProfileDto },
        { prisma }: Context,
      ) =>
        await prisma.profile.update({
          where: { id },
          data: dto,
        }),
    },
    
    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (
        root,
        { userId: subscriberId, authorId }: { userId: UUID; authorId: UUID },
        { prisma }: Context,
      ) => {
        await prisma.subscribersOnAuthors.create({
          data: {
            subscriberId,
            authorId,
          },
        })
        return subscriberId;
      }
    },
    unsubscribeFrom: {
      type: new GraphQLNonNull(UUIDType),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (
        root,
        { userId: subscriberId, authorId }: { userId: UUID; authorId: UUID },
        { prisma }: Context,
      ) => {
        await prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId,
              authorId,
            },
          },
        });
        return subscriberId;
      },
    },
  },
});
