import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
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

    // Verificar que el usuario tenga el rol especificado
    if (!user.roles.includes(dto.role)) {
      throw new ConflictException(
        `User does not have the role ${dto.role}. User must have this role to create a wallet for it.`,
      );
    }

    // IMPORTANTE: Verificar que este address NO esté siendo usado por OTRO usuario
    const walletsWithAddress = await this.prisma.wallet.findMany({
      where: { address: dto.address },
    });

    const anotherUserWallet = walletsWithAddress.find(
      (w) => w.user_id !== userId,
    );

    if (anotherUserWallet) {
      throw new ConflictException(
        `Wallet address ${dto.address} is already registered by another user. Each wallet can only belong to one user.`,
      );
    }

    // Verificar que la combinación user_id + address + role no exista
    const existingWalletForRole = await this.prisma.wallet.findUnique({
      where: {
        user_id_address_role: {
          user_id: userId,
          address: dto.address,
          role: dto.role,
        },
      },
    });

    if (existingWalletForRole) {
      throw new ConflictException(
        `Wallet address ${dto.address} is already registered for role ${dto.role}. You can use the same wallet for different roles.`,
      );
    }

    // Si se marca como primaria, desmarcar las demás wallets del usuario para este rol
    if (dto.is_primary) {
      await this.prisma.wallet.updateMany({
        where: {
          user_id: userId,
          role: dto.role,
        },
        data: { is_primary: false },
      });
    }

    // Crear la wallet
    const wallet = await this.prisma.wallet.create({
      data: {
        user_id: userId,
        address: dto.address,
        role: dto.role,
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

  async validateAddress(
    address: string,
    userId?: string,
    role?: UserRole,
  ) {
    const wallets = await this.prisma.wallet.findMany({
      where: { address },
    });

    // Si no se proporciona userId, retornar info básica (backward compatibility)
    if (!userId) {
      return {
        exists: wallets.length > 0,
        address,
        count: wallets.length,
        roles: wallets.map((w) => w.role),
      };
    }

    // Validación avanzada con userId y role
    const userWallets = wallets.filter((w) => w.user_id === userId);
    const otherUserWallets = wallets.filter((w) => w.user_id !== userId);

    // Caso 1: La wallet está siendo usada por otro usuario
    if (otherUserWallets.length > 0) {
      return {
        canUse: false,
        reason: 'This wallet is already registered by another user',
        address,
        exists: true,
      };
    }

    // Caso 2: Se especificó un rol
    if (role) {
      const existingForRole = userWallets.find((w) => w.role === role);

      if (existingForRole) {
        return {
          canUse: false,
          reason: `You already registered this wallet for ${role}`,
          address,
          exists: true,
          existingWallets: userWallets.map((w) => ({
            role: w.role,
            is_primary: w.is_primary,
          })),
        };
      }

      // Puede usar esta wallet para este rol
      return {
        canUse: true,
        reason:
          userWallets.length > 0
            ? `You can reuse this wallet for ${role}`
            : 'This wallet is available',
        address,
        exists: userWallets.length > 0,
        existingWallets: userWallets.map((w) => ({
          role: w.role,
          is_primary: w.is_primary,
        })),
      };
    }

    // Caso 3: Solo se proporcionó userId (sin rol específico)
    return {
      canUse: userWallets.length === 0,
      reason:
        userWallets.length > 0
          ? 'You already registered this wallet'
          : 'This wallet is available',
      address,
      exists: userWallets.length > 0,
      existingWallets: userWallets.map((w) => ({
        role: w.role,
        is_primary: w.is_primary,
      })),
    };
  }

  async findPrimaryByUser(userId: string, role?: UserRole) {
    // Verificar que el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Obtener la wallet primaria del usuario (opcionalmente filtrada por rol)
    const primaryWallet = await this.prisma.wallet.findFirst({
      where: {
        user_id: userId,
        is_primary: true,
        ...(role && { role }),
      },
    });

    if (!primaryWallet) {
      const roleMsg = role ? ` for role ${role}` : '';
      throw new NotFoundException(
        `No primary wallet found for user ${userId}${roleMsg}`,
      );
    }

    return primaryWallet;
  }

  async findAllByUserAndRole(userId: string, role: UserRole) {
    // Verificar que el usuario existe
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Verificar que el usuario tiene el rol especificado
    if (!user.roles.includes(role)) {
      throw new ConflictException(
        `User does not have the role ${role}`,
      );
    }

    // Obtener todas las wallets del usuario para el rol especificado
    const wallets = await this.prisma.wallet.findMany({
      where: {
        user_id: userId,
        role: role,
      },
      orderBy: [{ is_primary: 'desc' }, { created_at: 'desc' }],
    });

    return wallets;
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

    // Desmarcar todas las wallets del usuario para este rol como primarias
    await this.prisma.wallet.updateMany({
      where: {
        user_id: userId,
        role: wallet.role,
      },
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
