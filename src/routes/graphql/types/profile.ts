import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeType, MemberTypeIdEnum } from './member-type.js';
import { Context } from './types/interface.js';
import { ProfileModel } from './types/types.js';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeIdEnum },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberType: {
      type: MemberTypeType,
      resolve: async (root: ProfileModel, args, context: Context) => {
        return await context.prisma.memberType.findUnique({
          where: { id: root.memberTypeId },
        });
      },
    },
  }),
});

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeIdEnum) },
    userId: { type: new GraphQLNonNull(UUIDType) },
  },
});
