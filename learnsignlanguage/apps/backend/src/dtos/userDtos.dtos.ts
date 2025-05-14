/* eslint-disable prettier/prettier */
import { RankDto } from "./RankDtos.dtos";
import { ScoreDto } from "./ScoreDto.dtos";
export class UserDto {
    id: string;
    name: string;
    email: string;
    password: string;
    is_active: boolean;
    createdTime: Date;
    updatedTime: Date;
    scores: ScoreDto[];
    ranks: RankDto[];
}