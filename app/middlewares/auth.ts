import { ORPCError, os } from "@orpc/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { cache } from "react";

export const requiredAuthMiddleware = os
  .$context<{ session?: { user?: KindeUser<Record<string, any>> } }>()
  .middleware(async ({ context, next }) => {
    /**
     * Why we should ?? here?
     * Because it can avoid `getSession` being called when unnecessary.
     * {@link https://orpc.unnoq.com/docs/best-practices/dedupe-middleware}
     */
    const session = context.session ?? (await getSession());

    if (!session.user) {
      throw new ORPCError("UNAUTHORIZED");
    }

    return next({
      context: { user: session.user },
    });
  });

const getSession = cache(async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return { user };
});

export const authed = os.use(requiredAuthMiddleware);
