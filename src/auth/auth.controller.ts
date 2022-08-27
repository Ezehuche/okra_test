import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PrincipalGuard } from 'src/users/guards/principal.guard';
import { AuthsService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { auth } from 'src/scrapers/okraBank/auth';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  // @UseGuards(PrincipalGuard)
  //   @ApiOperation({
  //     summary: 'Start Auth Process',
  //     description: 'Start Auth Process',
  //   })
  //   @ApiBody({
  //     description: 'Request Body',
  //     type: CreateAuthDto,
  //   })
  //   @ApiResponse({
  //     status: 200,
  //   })
  //   @ApiHeader({
  //     name: 'x-access-token',
  //     description: 'Super Admin JWT',
  //     required: true,
  //   })
  @Post()
  // @UsePipes(new ValidationPipe())
  async createAuth(@Body() createAuth: CreateAuthDto, @Request() req) {
    const user_auth = await auth();
    // const customer_details = await customer('https://bankof.okra.ng/dashboard');
    console.log(user_auth);
    const payload = { ...createAuth, user_id: req.user.userId };
    return this.authsService.create(payload);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authsService.remove(+id);
  }
}
