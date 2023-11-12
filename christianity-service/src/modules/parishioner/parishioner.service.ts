import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { POSITION_PARISH, TYPEORM } from '../../core/constants';
import { Parishioner } from './parishioner.entity';
import { CreateProfileReqDto, UpdateProfileReqDto } from './dto/req.dto';
import {
  GetProfileResDto,
  GetProfilesResDto,
  RegistrationAccountResDto,
  UpdateProfileResDto,
} from './dto/res.dto';
import { AppResponse } from '@/core/app.response';
import { Account } from '../account/account.entity';
import { ErrorHandler } from '@/core/common/error';
import { Bcrypt } from '@/core/utils/bcrypt';

@Injectable()
export class ParishionerService {
  private _dataSource: DataSource;
  private _profileRepository: Repository<Parishioner>;
  private _accountRepository: Repository<Account>;
  constructor(@Inject(TYPEORM) dataSource: DataSource) {
    this._dataSource = dataSource;
    this._profileRepository = dataSource.getRepository(Parishioner);
    this._accountRepository = dataSource.getRepository(Account);
  }

  async createProfile(data: CreateProfileReqDto): Promise<GetProfileResDto> {
    try {
      const { fullname, christianName } = data;
      const profile = await this._profileRepository
        .createQueryBuilder()
        .insert()
        .into(Parishioner)
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
      const profiles = await this._profileRepository.find({
        relations: ['parish_cluster'],
      });
      return AppResponse.setSuccessResponse<GetProfilesResDto>(profiles);
    } catch (error) {
      return AppResponse.setAppErrorResponse<GetProfilesResDto>(error.message);
    }
  }

  async getProfilesMonk(): Promise<GetProfilesResDto> {
    try {
      const profiles = await this._profileRepository.find({
        where: {
          position: POSITION_PARISH.MONK,
        },
      });
      return AppResponse.setSuccessResponse<GetProfilesResDto>(profiles);
    } catch (error) {
      return AppResponse.setAppErrorResponse<GetProfilesResDto>(error.message);
    }
  }

  async getProfilesReqAccount(): Promise<GetProfilesResDto> {
    try {
      const profiles = await this._profileRepository.find({
        where: {
          isReqAccount: true,
        },
      });
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
        .from(Parishioner, 'profile')
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

  async importData(data: any): Promise<any> {
    try {
      const seedImportData = await this._profileRepository.save(data);
      const res = {
        status: 200,
        message: 'Import data successfully',
        data: seedImportData,
      };
      return res;
    } catch (error) {
      throw error;
    }
  }

  async registrationAccount(payload: any): Promise<RegistrationAccountResDto> {
    try {
      const profiles = await this._profileRepository.find({
        where: { phonenumber: payload.phonenumber },
      });

      if (!profiles) {
        return AppResponse.setAppErrorResponse<RegistrationAccountResDto>(
          'Profile not found',
        );
      }

      const existPhoneNumber = await this._accountRepository.findOne({
        where: { phonenumber: payload.phonenumber },
      });

      if (payload.phonenumber === existPhoneNumber?.phonenumber) {
        return AppResponse.setUserErrorResponse<RegistrationAccountResDto>(
          ErrorHandler.alreadyExists('The phone number'),
        );
      }

      const hashPassword = Bcrypt.handleHashPassword(payload.password);
      const data = {
        fullname: payload.fullname,
        christianName: payload.christianName,
        parishionerId: profiles[0].id,
        password: hashPassword,
        roleId: 2,
        phonenumber: payload.phonenumber,
      };

      const updateProfile = await this._profileRepository.update(
        { id: profiles[0].id },
        { isReqAccount: true },
      );
      const account = await this._accountRepository
        .createQueryBuilder()
        .insert()
        .into(Account)
        .values(data)
        .execute();

      return AppResponse.setSuccessResponse<RegistrationAccountResDto>(
        account.identifiers[0].id,
        {
          status: 201,
          message: 'Created',
        },
      );
    } catch (error) {
      throw error;
    }
  }
}
