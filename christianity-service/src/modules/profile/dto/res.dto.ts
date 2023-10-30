import { ShareResDto } from '@/core/common/share.dto';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export class GetProfileResDto extends ShareResDto {}
export class GetProfilesResDto extends ShareResDto {}
export class UpdateProfileResDto extends ShareResDto {}

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;
