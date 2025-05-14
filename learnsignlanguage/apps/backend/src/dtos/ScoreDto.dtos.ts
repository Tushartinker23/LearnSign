/* eslint-disable prettier/prettier */

import { UserDto } from "./userDtos.dtos";
export class ScoreDto {
    id: string;
    title: string;
    date: string;
    score: number;
    createdTime: Date;
    userId: string;
    user: UserDto;
}