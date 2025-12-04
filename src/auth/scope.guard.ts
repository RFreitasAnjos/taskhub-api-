import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SCOPES_KEY } from './scope.decorator';

@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredScopes = this.reflector.getAllAndOverride<string[]>(SCOPES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredScopes || requiredScopes.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const tokenScopes = user?.scp?.split(' ') || [];

    return requiredScopes.every(scope => tokenScopes.includes(scope));
  }
}
