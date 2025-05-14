/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,In } from 'typeorm';
import { UserDto } from '@/dtos/userDtos.dtos';
import { Score, User } from '@/entities/user.entity';
import { ScoreDto } from '@/dtos/ScoreDto.dtos';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
  ) {}

  async create(userDto: UserDto): Promise<User> {
    const user = this.userRepository.create(userDto);
    return this.userRepository.save(user);
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string, password: string): Promise<User | null> {
    return this.userRepository.findOne({ 
      where: { 
        email,
        password 
      } 
    });
  }

  async createScore(scoreDto: ScoreDto): Promise<Score> {
    const score = this.scoreRepository.create(scoreDto);
    return this.scoreRepository.save(score);
  }
  async getScore(userId: string): Promise<Score[]> {
    return this.scoreRepository.find({ 
      where: { userId }, // Fetch all records matching userId
      order: { 
        createdTime: 'DESC' // Sort by createdTime in descending order (latest first)
      },
    });
  }

  async getTopUsersByScore(): Promise<any> {
    try {
      const scores = await this.scoreRepository
        .createQueryBuilder('score')
        .select('score.userId', 'userId')
        .addSelect('SUM(score.score)', 'totalScore')
        .groupBy('score.userId')
        .orderBy('totalScore', 'DESC')
        .getRawMany();
  
      if (!scores.length) {
        return [];
      }
  
      const userIds = scores.map((score) => score.userId);
      const users = await this.userRepository.find({
        where: { id: In(userIds) },
        select: ['id', 'name'],
      });
  
      const rankedUsers = scores.map((score, index) => {
        const user = users.find((u) => u.id === score.userId);
        return {
          userId: score.userId,
          totalScore: Number(score.totalScore),
          rank: index + 1,
          user: user || { id: score.userId, email: 'Unknown' },
        };
      });
  
      return rankedUsers.length > 10 ? rankedUsers.slice(0, 10) : rankedUsers;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch top users by score');
    }
  }
}