import { NOT_ADMIN_ERR_MSG, UNAUTHED_ERR_MSG } from '@shared/const';
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

const requireUser = t.middleware(async opts => {
  const { ctx, next } = opts;

  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(requireUser);

// Emails that always have admin access regardless of DB role
const ADMIN_EMAIL_WHITELIST = [
  "josh@thelocalcaterer.com",
  "kasandra@thelocalcaterer.com",
  "robertgray@gmail.com",
];

export const isAdminUser = (user: TrpcContext["user"]): boolean => {
  if (!user) return false;
  if (user.role === "admin") return true;
  if (user.email && ADMIN_EMAIL_WHITELIST.includes(user.email.toLowerCase())) return true;
  return false;
};

export const adminProcedure = t.procedure.use(
  t.middleware(async opts => {
    const { ctx, next } = opts;

    if (!isAdminUser(ctx.user)) {
      throw new TRPCError({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }

    return next({
      ctx: {
        ...ctx,
        user: ctx.user!,
      },
    });
  }),
);
