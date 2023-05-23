import { PartialType } from "@nestjs/swagger";
import { CreateUserDtoApi } from "./create-user.dto";

export class UpdateUserDtoApi extends PartialType(CreateUserDtoApi) {}