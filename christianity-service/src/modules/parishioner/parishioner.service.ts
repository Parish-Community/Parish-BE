import { Injectable, Inject } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { POSITION_PARISH, TYPEORM } from '../../core/constants';
import { Parishioner } from './parishioner.entity';
import {
  CreateProfileReqDto,
  GetProfilesReqDto,
  UpdateProfileReqDto,
} from './dto/req.dto';
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
import { ExtraQueryBuilder } from '@/core/utils/querybuilder.typeorm';

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

  async getProfiles(queries: GetProfilesReqDto): Promise<GetProfilesResDto> {
    try {
      const userTableFields: Array<string> = this._dataSource
        .getMetadata(Parishioner)
        .columns.map((column) => {
          return column.propertyName;
        });
      const mappingUserFieldType: Array<string> = this._dataSource
        .getMetadata(Parishioner)
        .columns.map((column) => {
          return `${column.propertyName}:${column.type}`;
        });

      let query: SelectQueryBuilder<Parishioner> = this._dataSource
        .createQueryBuilder()
        .select([
          'parishioner.id',
          'parishioner.fullname',
          'parishioner.christianName',
          'parishioner.name_father',
          'parishioner.name_mother',
          'parishioner.god_parent',
          'parishioner.phonenumber',
          'parishioner.dateOfBirth',
          'parishioner.gender',
          'parishioner.avatar',
          'parishioner.address',
          'parishioner.diocese',
          'parishioner.isReqMarriageCatechism',
          'parishioner.parish',
          'parishioner.parish_clusterId',
          'parish_cluster.parish_clusterId',
          'parish_cluster.name',
          'parishioner.position',
          'parishioner.isMarried',
          'parishioner.createdAt',
        ])
        .from(Parishioner, 'parishioner')
        .innerJoin(
          'parishioner.parish_cluster',
          'parish_cluster',
          'parishioner.parish_clusterId = parish_cluster.parish_clusterId',
        );

      query = ExtraQueryBuilder.addWhereAnd<Parishioner>(
        query,
        mappingUserFieldType,
        queries,
        'parishioner',
      );

      query = ExtraQueryBuilder.addWhereOr<Parishioner>(
        query,
        [
          'parishioner.fullname',
          'parishioner.christianName',
          'parishioner.dateOfBirth',
          'parishioner.phonenumber',
          'parish_cluster.name',
        ],
        queries,
      );
      if (queries.sortBy) {
        if (!userTableFields.includes(queries.sortBy)) {
          return AppResponse.setUserErrorResponse<GetProfilesResDto>(
            ErrorHandler.invalid(queries.sortBy),
          );
        }
        query.orderBy(
          `parishioner.${queries.sortBy}`,
          queries.order === 'ASC' ? 'ASC' : 'DESC',
        );
      } else {
        query.orderBy('parishioner.createdAt', 'DESC');
      }

      const { fullQuery, pages, nextPage, totalDocs, prevPage, currentPage } =
        await ExtraQueryBuilder.paginateBy<Parishioner>(query, {
          page: queries.page,
          pageSize: queries.pageSize,
        });
      const profiles: any[] = await fullQuery.getMany();
      return AppResponse.setSuccessResponse<GetProfilesResDto>(profiles, {
        page: currentPage,
        pageSize: queries.pageSize,
        totalPages: pages,
        nextPage: nextPage,
        prevPage: prevPage,
        totalDocs: totalDocs,
      });
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
          'profile.phonenumber',
          'profile.avatar',
          'profile.address',
          'profile.diocese',
          'profile.isReqMarriageCatechism',
          'profile.parish',
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

  async getPartner(phonenumber: string): Promise<GetProfileResDto> {
    try {
      const profile = await this._profileRepository.findOne({
        where: { phonenumber: phonenumber },
        relations: ['parish_cluster'],
      });

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

      if (phonenumber !== profile.phonenumber && phonenumber) {
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

  async getParishClusterStatistics(): Promise<any> {
    const results = await this._dataSource
      .createQueryBuilder()
      .select(['parish_cluster.name'])
      .addSelect(
        'COUNT(parishioner.gender) FILTER (WHERE parishioner.gender = :male)',
        'maleCount',
      )
      .addSelect(
        'COUNT(parishioner.gender) FILTER (WHERE parishioner.gender = :female)',
        'femaleCount',
      )
      .from(Parishioner, 'parishioner')
      .innerJoin(
        'parishioner.parish_cluster',
        'parish_cluster',
        'parishioner.parish_clusterId = parish_cluster.parish_clusterId',
      )
      .groupBy('parish_cluster.name')
      .addGroupBy('parishioner.gender')
      .setParameters({
        male: 'male',
        female: 'female',
      })
      .getRawMany();

    const formattedResults = results.flatMap((result) => {
      console.log(result);
      return [
        {
          parishCluster: result.parish_cluster_name,
          value: parseInt(result.maleCount),
          type: 'Male',
        },
        {
          parishCluster: result.parish_cluster_name,
          value: parseInt(result.femaleCount),
          type: 'Female',
        },
      ];
    });

    const res = {
      data: formattedResults,
      status: 200,
    };

    return res;
  }

  async countTotalRecords(): Promise<any> {
    const totalRecords = await this._profileRepository.count();
    const res = {
      data: totalRecords,
      status: 200,
    };
    return res;
  }
}
