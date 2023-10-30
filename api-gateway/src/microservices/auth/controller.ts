import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './service';
import { LoginReqDto } from './dto/auth.dto';
import { JwtAuthGuard, RefreshTokenGuard } from '@/guards';
import { GetAccount } from '@/decorator/account.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 201,
    description: 'Login',
  })
  @ApiBody({
    type: LoginReqDto,
  })
  createRole(@Body() data: LoginReqDto) {
    return this.authService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  @ApiBearerAuth('access_token')
  @ApiOperation({ summary: 'Logout' })
  logout(@GetAccount() account) {
    return this.authService.logout(account);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/refresh-token')
  @ApiBearerAuth('access_token')
  refreshToken(@GetAccount() account) {
    return this.authService.refreshToken(account);
  }
}
