import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthPayload } from "../../auth/domain/auth-payload";

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as AuthPayload;
  },
);
