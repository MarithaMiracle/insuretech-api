import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id/wallet')
  @ApiOperation({
    summary: 'Get user wallet balance',
    description: 'Returns the current wallet balance of the user.',
  })
  getWallet(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getWalletBalance(id);
  }
}
