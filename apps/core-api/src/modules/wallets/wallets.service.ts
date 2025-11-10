import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Injectable()
export class WalletsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateWalletDto) {
    // Verificar que el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Verificar que la wallet no esté ya registrada
    const existingWallet = await this.prisma.wallet.findUnique({
      where: { address: dto.address },
    });

    if (existingWallet) {
      throw new ConflictException(
        `Wallet address ${dto.address} is already registered`,
      );
    }

    // Si se marca como primaria, desmarcar las demás wallets del usuario
    if (dto.is_primary) {
      await this.prisma.wallet.updateMany({
        where: { user_id: userId },
        data: { is_primary: false },
      });
    }

    // Crear la wallet
    const wallet = await this.prisma.wallet.create({
      data: {
        user_id: userId,
        address: dto.address,
        is_primary: dto.is_primary ?? false,
      },
    });

    return wallet;
  }

  async findAllByUser(userId: string) {
    // Verificar que el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Obtener todas las wallets del usuario
    const wallets = await this.prisma.wallet.findMany({
      where: { user_id: userId },
      orderBy: [{ is_primary: 'desc' }, { created_at: 'desc' }],
    });

    return wallets;
  }

  async validateAddress(address: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { address },
    });

    return {
      exists: !!wallet,
      address,
    };
  }

  async setPrimary(userId: string, walletId: string) {
    // Verificar que la wallet existe y pertenece al usuario
    const wallet = await this.prisma.wallet.findUnique({
      where: { wallet_id: walletId },
    });

    if (!wallet) {
      throw new NotFoundException(`Wallet with ID ${walletId} not found`);
    }

    if (wallet.user_id !== userId) {
      throw new ConflictException(
        `Wallet ${walletId} does not belong to user ${userId}`,
      );
    }

    // Desmarcar todas las wallets del usuario como primarias
    await this.prisma.wallet.updateMany({
      where: { user_id: userId },
      data: { is_primary: false },
    });

    // Marcar esta wallet como primaria
    const updatedWallet = await this.prisma.wallet.update({
      where: { wallet_id: walletId },
      data: { is_primary: true },
    });

    return updatedWallet;
  }
}
