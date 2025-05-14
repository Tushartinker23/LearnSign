/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from '@/services/user.service';
import { UserDto } from '@/dtos/userDtos.dtos';
import { ScoreDto } from '@/dtos/ScoreDto.dtos';

@Controller('api')
export class ApiController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Post('/login-or-signup')
  async loginOrSignup(@Body() userDto: UserDto) {
    const { email, password } = userDto;
    let user = await this.userService.findByEmail(email, password);

    if (!user) {
      user = await this.userService.create(userDto);
    }

    return { id: user.id, name: user.name };
  }
  @Post('/score-creation')
  async createScore(@Body() scoreDto: ScoreDto) {
    const score = await this.userService.createScore(scoreDto);
    return score;
  }
  @Get('/score/:id')
  async getScore(@Param('id') id: string) {
    // Get score by ID
    const score = await this.userService.getScore(id);
    return score;
  }
  @Get('/getTopscore')
  async getTopScore() {
    // Get score by ID
    const score = await this.userService.getTopUsersByScore();

    return score;
  }
}