import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class UploadsService {
  private supabase: SupabaseClient;

  constructor(private prisma: PrismaService) {
    // Inicializar cliente de Supabase
    this.supabase = createClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    );
  }

  /**
   * Sube un avatar de usuario y actualiza el registro en la BD
   */
  async uploadAvatar(
    file: Express.Multer.File,
    userId: string,
  ): Promise<{ url: string; user: any }> {
    // Verificar que el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Validar tipo de archivo
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Only JPEG, PNG, and WebP are allowed.',
      );
    }

    // Validar tamaño (2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      throw new BadRequestException('File size must be less than 2MB');
    }

    // Borrar avatar anterior si existe
    if (user.avatar_url) {
      try {
        // Extraer el path del archivo de la URL
        const urlParts = user.avatar_url.split('/avatars/');
        if (urlParts.length > 1) {
          const oldFilePath = urlParts[1];
          await this.supabase.storage.from('avatars').remove([oldFilePath]);
        }
      } catch (error) {
        // Ignorar si falla (el archivo puede no existir)
        console.warn('Failed to delete old avatar:', error);
      }
    }

    // Generar nombre único con folder por usuario
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${userId}/avatar-${Date.now()}.${fileExt}`;

    // Subir a Supabase Storage
    const { error } = await this.supabase.storage
      .from('avatars')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw new BadRequestException(`Upload failed: ${error.message}`);
    }

    // Obtener URL pública
    const {
      data: { publicUrl },
    } = this.supabase.storage.from('avatars').getPublicUrl(fileName);

    // Actualizar usuario en la BD
    const updatedUser = await this.prisma.user.update({
      where: { user_id: userId },
      data: { avatar_url: publicUrl },
      select: {
        user_id: true,
        username: true,
        email: true,
        avatar_url: true,
      },
    });

    return {
      url: publicUrl,
      user: updatedUser,
    };
  }

  /**
   * Sube una imagen de campaña y actualiza el registro en la BD
   */
  async uploadCampaignImage(
    file: Express.Multer.File,
    campaignId: string,
  ): Promise<{ url: string; campaign: any }> {
    // Verificar que la campaña existe
    const campaign = await this.prisma.campaign.findUnique({
      where: { campaign_id: campaignId },
    });

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${campaignId} not found`);
    }

    // Validar tipo de archivo
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        'Invalid file type. Only JPEG, PNG, and WebP are allowed.',
      );
    }

    // Validar tamaño (5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new BadRequestException('File size must be less than 5MB');
    }

    // Borrar imagen anterior si existe
    if (campaign.image_url) {
      try {
        // Extraer el path del archivo de la URL
        const urlParts = campaign.image_url.split('/campaign-images/');
        if (urlParts.length > 1) {
          const oldFilePath = urlParts[1];
          await this.supabase.storage
            .from('campaign-images')
            .remove([oldFilePath]);
        }
      } catch (error) {
        // Ignorar si falla (el archivo puede no existir)
        console.warn('Failed to delete old campaign image:', error);
      }
    }

    // Generar nombre único con folder por campaña
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${campaignId}/image-${Date.now()}.${fileExt}`;

    // Subir a Supabase Storage
    const { error } = await this.supabase.storage
      .from('campaign-images')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      throw new BadRequestException(`Upload failed: ${error.message}`);
    }

    // Obtener URL pública
    const {
      data: { publicUrl },
    } = this.supabase.storage.from('campaign-images').getPublicUrl(fileName);

    // Actualizar campaña en la BD
    const updatedCampaign = await this.prisma.campaign.update({
      where: { campaign_id: campaignId },
      data: { image_url: publicUrl },
      select: {
        campaign_id: true,
        name: true,
        description: true,
        image_url: true,
        status: true,
      },
    });

    return {
      url: publicUrl,
      campaign: updatedCampaign,
    };
  }

  /**
   * Elimina un archivo de Supabase Storage
   */
  async deleteFile(bucket: string, fileName: string): Promise<void> {
    const { error } = await this.supabase.storage
      .from(bucket)
      .remove([fileName]);

    if (error) {
      throw new BadRequestException(`Delete failed: ${error.message}`);
    }
  }

  /**
   * Obtiene la URL pública de un archivo
   */
  getPublicUrl(bucket: string, fileName: string): string {
    const {
      data: { publicUrl },
    } = this.supabase.storage.from(bucket).getPublicUrl(fileName);

    return publicUrl;
  }
}
