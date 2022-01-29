import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class TaskDTO {
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name : string;

    id : string;
    completed: boolean;
    owner: string;
    duration: number;

}