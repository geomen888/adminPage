import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  UseMiddleware,
  Ctx
} from "type-graphql";
import { sign } from "jsonwebtoken";
import { hash, compare } from "bcryptjs";
import { Supervisor } from "./models";
import { isAuth } from "./authMiddleware";
import { MyContext } from "./myContext";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  async hello() {
    return "Hello World";
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  async Me(@Ctx() { payload }: MyContext) {
    return `Your user id : ${payload!.userId}`;
  }

  @Mutation(() => Boolean)
  async Register(
    @Arg("name") name: string,
    @Arg("age") age: number,
    @Arg("password") password: string,
  ) {
    const hashedPassword = await hash(password, 13);
    // let user = null;
    try {
      await Supervisor.insert({
        name,
        age,
        password: hashedPassword
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }

  @Mutation(() => LoginResponse)
  async Login(@Arg("name") name: string, @Arg("password") password: string) {
    const admin = await Supervisor.findOne({ where: { name } });

    if (!admin) {
      throw new Error("Could not find admin");
    }

    const verify = await compare(password, admin.password);

    if (!verify) {
      throw new Error("Bad password");
    }

    return {
      accessToken: sign({ userId: admin.id }, "MySecretKey", {
        expiresIn: "15m"
      })
    };
  }
}
