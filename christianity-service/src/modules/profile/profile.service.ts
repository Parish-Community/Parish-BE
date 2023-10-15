import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { TYPEORM } from '../../core/constants';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  private _dataSource: DataSource;
  private _profileRepository: Repository<Profile>;
  constructor(@Inject(TYPEORM) dataSource: DataSource) {
    this._dataSource = dataSource;
    this._profileRepository = dataSource.getRepository(Profile);
  }

  //create a new profile
  async createProfile(data: Profile): Promise<Profile> {
    return await this._profileRepository.save(data);
  }

  // async getProfile(profile: Profile): Promise<Profile> {
  //   return await this._profileRepository.findOne(profile);
  // }
}
