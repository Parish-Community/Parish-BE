import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { TYPEORM } from '../../core/constants';
import { Profile } from './profile.entity';
import { CreateProfileReqDto, UpdateProfileReqDto } from './dto/req.dto';
import {
  GetProfileResDto,
  GetProfilesResDto,
  UpdateProfileResDto,
} from './dto/res.dto';
import { AppResponse } from '@/core/app.response';

@Injectable()
export class ProfileService {
  private _dataSource: DataSource;
  private _profileRepository: Repository<Profile>;
  constructor(@Inject(TYPEORM) dataSource: DataSource) {
    this._dataSource = dataSource;
    this._profileRepository = dataSource.getRepository(Profile);
  }

  async createProfile(data: CreateProfileReqDto): Promise<GetProfileResDto> {
    try {
      const { fullname, christianName } = data;
      const profile = await this._profileRepository
        .createQueryBuilder()
        .insert()
        .into(Profile)
        .values(data)
        .execute();

      return AppResponse.setSuccessResponse<GetProfileResDto>(
        {
          id: profile.identifiers[0].id,
          fullName: `${christianName} ${fullname}`,
        },
        {
          status: 201,
          message: `Created profile`,
        },
      );
    } catch (error) {
      return AppResponse.setAppErrorResponse<GetProfileResDto>(error.message);
    }
  }

  async getProfiles(): Promise<GetProfilesResDto> {
    try {
      const profiles = await this._profileRepository.find();
      return AppResponse.setSuccessResponse<GetProfilesResDto>(profiles);
    } catch (error) {
      return AppResponse.setAppErrorResponse<GetProfilesResDto>(error.message);
    }
  }

  async getProfile(profileId: number): Promise<GetProfileResDto> {
    try {
      const profile = await this._dataSource
        .createQueryBuilder()
        .select([
          'profile.id',
          'profile.fullname',
          'profile.christianName',
          'profile.gender',
          'profile.dateOfBirth',
          'profile.name_father',
          'profile.name_mother',
          'profile.god_parent',
          'profile.phonenumber',
          'profile.avatar',
          'profile.address',
          'profile.diocese',
          'profile.parish',
          'profile.isRequestAccount',
          'parish_cluster.parish_clusterId',
          'parish_cluster.name',
          // 'account.id',
          // 'account.email',
          // 'account.phonenumber',
          // 'account.isActive',
          // 'role.roleId',
          // 'role.name',
        ])
        .from(Profile, 'profile')
        // .innerJoin('profile.accounts', 'account')
        // .innerJoin('account.role', 'role', 'account.roleId = role.roleId')
        .innerJoin(
          'profile.parish_cluster',
          'parish_cluster',
          'profile.parish_clusterId = parish_cluster.id',
        )
        .where('profile.id = :profileId', { profileId: profileId })
        .getOne();

      return AppResponse.setSuccessResponse<GetProfileResDto>(profile);
    } catch (error) {
      return AppResponse.setAppErrorResponse<GetProfileResDto>(error.message);
    }
  }

  async updateProfile(
    profileId: number,
    payload: UpdateProfileReqDto,
  ): Promise<UpdateProfileResDto> {
    try {
      const { phonenumber } = payload;
      const profile = await this._profileRepository.findOne({
        where: { id: profileId },
      });
      if (!profile) {
        return AppResponse.setAppErrorResponse<UpdateProfileResDto>(
          'Profile not found',
        );
      }

      if (phonenumber) {
        const existPhoneNumber = await this._profileRepository.findOne({
          where: { phonenumber },
        });

        if (phonenumber === existPhoneNumber?.phonenumber) {
          return AppResponse.setUserErrorResponse<UpdateProfileResDto>(
            'The phone number already exists',
          );
        }
      }

      const updateProfile = await this._profileRepository.update(
        { id: profileId },
        payload,
      );

      return AppResponse.setSuccessResponse<UpdateProfileResDto>(
        updateProfile.affected,
        {
          status: 200,
          message: `Updated profile`,
        },
      );
    } catch (error) {
      return AppResponse.setAppErrorResponse<UpdateProfileResDto>(
        error.message,
      );
    }
  }

  async deleteProfile(profileId: number): Promise<UpdateProfileResDto> {
    try {
      const profile = await this._profileRepository.findOne({
        where: { id: profileId },
      });
      if (!profile) {
        return AppResponse.setAppErrorResponse<UpdateProfileResDto>(
          'Profile not found',
        );
      }

      const deleteProfile = await this._profileRepository.delete({
        id: profileId,
      });

      return AppResponse.setSuccessResponse<UpdateProfileResDto>(
        deleteProfile.affected,
        {
          status: 200,
          message: `Deleted profile`,
        },
      );
    } catch (error) {
      return AppResponse.setAppErrorResponse<UpdateProfileResDto>(
        error.message,
      );
    }
  }
}
