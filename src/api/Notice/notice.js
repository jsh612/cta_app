import { prisma } from "../../../generated/prisma-client";

export default {
  Notices: {
    ctaNotice: ({ id }) => prisma.notices({ id }).ctaNotice(),
    eduNotice: ({ id }) => prisma.notices({ id }).eduNotice()
  },
  CtaNotice: {
    notices: ({ id }) => prisma.ctaNotice({ id }).notices()
  },
  EduNotice: {
    notices: ({ id }) => prisma.eduNotice({ id }).notices()
  }
};
