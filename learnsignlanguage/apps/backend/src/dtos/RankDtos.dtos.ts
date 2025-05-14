/* eslint-disable prettier/prettier */
import { UserDto } from "./userDtos.dtos";
export class RankDto {
    id: string;
    rank: number;
    totalScore: number;
    updatedTime: Date;
    userId: string;
    user: UserDto;
}