import { GraphQLList, GraphQLObjectType } from "graphql";
import {MemberTypeIdEnum, MemberTypeType} from "./types/member-type.js";
import { MemberTypeId } from "../member-types/schemas.js";
import { PostType } from "./types/post.js";
import { UUIDType } from "./types/uuid.js";
import { UUID } from "crypto";
import { UserType } from "./types/user.js";
import { ProfileType } from "./types/profile.js";
import { Context } from "./types/types/interface.js";

export const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({

    memberTypes: {
      type: new GraphQLList(MemberTypeType
      ),
      resolve: async (root, args, context: Context) => {
        return await context.prisma.memberType.findMany();
      }
    },
    memberType: {
      type: MemberTypeType,
      args: { id: { type: MemberTypeIdEnum } },
      resolve: async (root, args: { id: MemberTypeId }, context: Context) => {
        return await context.prisma.memberType.findUnique({
          where: { id: args.id },
        });
      }
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (root, args, context: Context) =>
        await context.prisma.post.findMany(),
    },
    post: {
      type: PostType,
      args: { id: { type: UUIDType } },
      resolve: async (root, args: { id: UUID }, context: Context) => {
        return await context.prisma.post.findUnique({
          where: { id: args.id },
        });
      }
    },

    users: {
      type: new GraphQLList(UserType),
      resolve: async (root, args, context: Context) => {
        return await context.prisma.user.findMany();
      }
    },
    user: {
      type: UserType,
      args: { id: { type: UUIDType } },
      resolve: async (root, args: { id: UUID }, context: Context) => {
        return await context.prisma.user.findUnique({
          where: { id: args.id },
        });
      }
    },

    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (root, args, context: Context) => {
        return await context.prisma.profile.findMany();
      }
    },
    profile: {
      type: ProfileType,
      args: {id: { type: UUIDType }},
      resolve: async (root, args: { id: UUID }, context: Context) => {
        return await context.prisma.profile.findUnique({
          where: { id: args.id },
        });
      }
    },
  }),
});