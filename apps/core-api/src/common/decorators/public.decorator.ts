import { SetMetadata } from '@nestjs/common';

/**
 * Public Decorator
 * 
 * Marca un endpoint como público (sin autenticación requerida)
 * incluso cuando el controlador tiene guards globales.
 */
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

