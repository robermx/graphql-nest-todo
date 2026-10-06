import { Module } from '@nestjs/common';
import { HelloWorldResolver } from './hello-world.resolver.js';

@Module({
  providers: [HelloWorldResolver],
})
export class HelloWorldModule {}
