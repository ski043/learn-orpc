import { ORPCError, os } from "@orpc/server";
import { User } from "../schemas/user";

export const requiredAuthMiddleware = os
  .$context<{ session?: { user?: User } }>()
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

async function getSession() {
  // get the actual user session please

  return {
    user: {
      id: "askldfjalöksdfj",
      name: "Jan Marshal",
      email: "jan@alenix.de",
    },
  };
}

export const authed = os.use(requiredAuthMiddleware);
