import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    accs: ({ id }) => prisma.user({ id }).accs(),
    taxAccs: ({ id }) => prisma.user({ id }).taxAccs(),
    taxLaw1s: ({ id }) => prisma.user({ id }).taxLaw1s(),
    taxLaw2s: ({ id }) => prisma.user({ id }).taxLaw2s(),
    totalAccs: ({ id }) => prisma.user({ id }).totalAccs()
  }
};
