import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UploadsService } from './uploads.service';

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('avatar/:userId')
  @ApiOperation({
    summary: 'Upload user avatar',
    description: 'Uploads an avatar image to Supabase Storage, updates the user record, and returns the public URL',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const result = await this.uploadsService.uploadAvatar(file, userId);

    return {
      message: 'Avatar uploaded and user updated successfully',
      url: result.url,
      user: result.user,
    };
  }

  @Post('campaign/:campaignId')
  @ApiOperation({
    summary: 'Upload campaign image',
    description: 'Uploads a campaign image to Supabase Storage, updates the campaign record, and returns the public URL',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadCampaignImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('campaignId') campaignId: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const result = await this.uploadsService.uploadCampaignImage(
      file,
      campaignId,
    );

    return {
      message: 'Campaign image uploaded and campaign updated successfully',
      url: result.url,
      campaign: result.campaign,
    };
  }
}
