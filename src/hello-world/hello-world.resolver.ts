import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {
  @Query(() => String, {
    name: 'helloWorld',
    description: 'Returns a hello world',
  })
  getHelloWorld(): string {
    return 'Hello World';
  }

  @Query(() => Float, {
    name: 'randomNumber',
    description: 'Returns a random number with this format 00.00000...',
  })
  getRandomNumber(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    name: 'randomFromZeroTo',
    description: 'Returns a number between 0 and args value',
  })
  getRandomFromZeroTo(
    @Args('to', { nullable: true, type: () => Int }) to: number = 5,
  ): number {
    return Math.floor(Math.random() * (to + 1));
  }
}
