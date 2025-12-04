import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,

      // Emissor do token (issuer)
      issuer: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0`,

      // Público esperado
      audience: process.env.AZURE_API_IDENTIFIER,

      algorithms: ['RS256'],

      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        jwksUri: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/discovery/v2.0/keys`,
      }),
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
