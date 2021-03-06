import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Types } from 'mongoose';
import { ClientProxyProvider } from 'src/shared/providers/client-proxy.provider';
import { CreateChallengeDto } from '../dtos/create-challenge.dto';
import { Challenge, StatusChallenge } from '../models/challenge.schema';
import { ChallengesRepository } from '../repositories/challenges.repository';

@Injectable()
export class ChallengesService {

  constructor(
    private readonly challengesRepository:ChallengesRepository,
    private readonly clientProxy: ClientProxyProvider
  ) {}

  async create(createChallengeDto: CreateChallengeDto) {
    try {
      await this.challengesRepository.create(createChallengeDto);

      return this.clientProxy.getNotificationsInstance().emit('notifications-new-challenge', createChallengeDto).toPromise();
    } catch(error) {
      throw new RpcException(error.message);
    }
  }

  async findAll() {
    try {
      return this.challengesRepository.findAll();
    } catch(error) {
      throw new RpcException(error.message);
    }
  }

  async findById(id: string) {
    try {
      return this.challengesRepository.findById(id);
    } catch(error) {
      throw new RpcException(error.message)
    }
  }

  async findAllByPlayerId(playerId: string) {
    try {
      return this.challengesRepository.findAllByPlayerId(playerId);
    } catch(error) {
      throw new RpcException(error.message);
    }
  }

  async update(id: string, challenge: Challenge) {
    try {
      challenge.dateTimeAnswer = new Date();

      return this.challengesRepository.update(id, challenge);
    } catch(error) {
      throw new RpcException(error.message);
    }
  }

  async updateChallengeMatch(id: string, matchId: string, challenge: Challenge) {
    try {

      challenge.status = StatusChallenge.DONE;
      challenge.match = Types.ObjectId(matchId);

      return this.challengesRepository.update(id, challenge);
    } catch(error) {
      throw new RpcException(error.message);
    }
  }

  async delete(id: string, challenge: Challenge) {
    try {
      challenge.status = StatusChallenge.CANCEL;

      return this.challengesRepository.update(id, challenge)
    } catch(error) {
      throw new RpcException(error.message)
    }
  }

  async findAllByCategoryAndDateRef(category: string, dateRef: string) {
    if(!dateRef) {
      return  this.challengesRepository.findAllByCategory(category);
    }

    const date = new Date(`${dateRef} 23:59:59.999`)
    const dateFormatted = date.toISOString();

    return this.challengesRepository.findAllByCategoryAndDate(category, dateFormatted);
  }
}
