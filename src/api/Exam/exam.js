import { prisma } from "../../../generated/prisma-client";

export default {
  Acc: {
    user: ({ id }) => prisma.acc({ id }).user()
  },
  TaxAcc: {
    user: ({ id }) => prisma.taxAcc({ id }).user()
  },
  TaxLaw1: {
    user: ({ id }) => prisma.taxLaw1({ id }).user()
  },
  TaxLaw2: {
    user: ({ id }) => prisma.taxLaw2({ id }).user()
  },
  TotalAcc: {
    user: ({ id }) => prisma.totalAcc({ id }).user()
  }
};
