# Wallet Role Migration Guide

## Resumen de Cambios

Se ha agregado un campo `role` a la tabla `Wallet` para separar las wallets por rol de usuario. Esto permite que un usuario pueda tener diferentes wallets para diferentes roles (CONTRIBUTOR, MAINTAINER, ADMIN).

## Motivación

- **Contributors**: Las wallets se usan principalmente para **recibir pagos** (input pasivo)
- **Maintainers**: Las wallets deben **firmar transacciones** (requiere conexión activa)
- **Separación de concerns**: Mejor práctica separar wallets por función/rol

## Cambios en el Schema de Base de Datos

### Antes

```prisma
model Wallet {
  wallet_id  String   @id @default(uuid()) @db.Uuid
  user_id    String   @db.Uuid
  address    String   @unique
  is_primary Boolean  @default(false)
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  user User @relation(fields: [user_id], references: [user_id], onDelete: Cascade)

  @@index([user_id])
  @@index([address])
  @@map("wallet")
}
```

### Después

```prisma
model Wallet {
  wallet_id  String   @id @default(uuid()) @db.Uuid
  user_id    String   @db.Uuid
  address    String
  role       UserRole // NUEVO: Identifica el rol para el cual se usa esta wallet
  is_primary Boolean  @default(false)
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  user User @relation(fields: [user_id], references: [user_id], onDelete: Cascade)

  @@unique([user_id, address, role]) // NUEVO: Permite misma address para diferentes roles
  @@index([user_id])
  @@index([address])
  @@index([user_id, role]) // NUEVO: Índice para queries por rol
  @@map("wallet")
}
```

### Cambios Clave

1. **Campo `role` agregado**: Tipo `UserRole` (ADMIN, MAINTAINER, CONTRIBUTOR)
2. **`address` ya no es `@unique` globalmente**: Ahora se usa `@@unique([user_id, address, role])`
3. **Nuevo índice**: `@@index([user_id, role])` para optimizar queries por rol

## Cambios en la API

### 1. CreateWalletDto

**Nuevo campo requerido `role`**:

```json
{
  "address": "GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "role": "CONTRIBUTOR",
  "is_primary": false
}
```

### 2. Endpoints Actualizados

#### POST `/wallets/user/:userId`
- Ahora requiere el campo `role` en el body
- Valida que el usuario tenga el rol especificado
- La verificación de duplicados ahora es por `[user_id, address, role]`

#### GET `/wallets/user/:userId?role=CONTRIBUTOR`
- Nuevo query param opcional `role` para filtrar wallets por rol
- Sin el param, retorna todas las wallets del usuario

#### GET `/wallets/user/:userId/primary?role=CONTRIBUTOR`
- Nuevo query param opcional `role` para obtener wallet primaria por rol
- Sin el param, retorna cualquier wallet primaria

#### PATCH `/wallets/user/:userId/:walletId/set-primary`
- Ahora solo desmarca wallets del **mismo rol** al establecer una como primaria

### 3. Nuevas Validaciones

- ✅ Verifica que el usuario tenga el rol antes de crear una wallet
- ✅ **Verifica que el address NO esté siendo usado por otro usuario** (una wallet = un usuario)
- ✅ Permite que el mismo usuario use su address para diferentes roles
- ✅ Cada rol puede tener su propia wallet primaria
- ✅ Previene que se duplique la misma wallet para el mismo rol


## Cómo Funciona: Ejemplos Prácticos

### Casos Permitidos

```javascript
// Caso 1: Marco registra su wallet para CONTRIBUTOR
POST /wallets/user/marco-123
{
  "address": "GAAAA...XXX",
  "role": "CONTRIBUTOR"
}
//  OK - Primera vez que Marco usa esta wallet

// Caso 2: Marco registra LA MISMA wallet para MAINTAINER
POST /wallets/user/marco-123
{
  "address": "GAAAA...XXX",  // Mismo address
  "role": "MAINTAINER"        // Diferente rol
}
//  OK - Marco puede usar su wallet para múltiples roles

// Caso 3: Marco tiene múltiples wallets diferentes
POST /wallets/user/marco-123
{
  "address": "GBBB...YYY",   // Diferente address
  "role": "CONTRIBUTOR"
}
//  OK - Marco puede tener varias wallets
```

### Casos Bloqueados

```javascript
// Caso 1: María intenta usar la wallet de Marco
POST /wallets/user/maria-456
{
  "address": "GAAAA...XXX",  // Wallet de Marco
  "role": "CONTRIBUTOR"
}
// ERROR: "Wallet address is already registered by another user"

// Caso 2: Marco intenta duplicar wallet + rol
POST /wallets/user/marco-123
{
  "address": "GAAAA...XXX",
  "role": "CONTRIBUTOR"      // Ya existe [marco-123, GAAAA...XXX, CONTRIBUTOR]
}
// ERROR: "Wallet address is already registered for role CONTRIBUTOR"

// Caso 3: Marco intenta crear wallet para un rol que no tiene
POST /wallets/user/marco-123
{
  "address": "GCCC...ZZZ",
  "role": "ADMIN"            // Marco no es ADMIN
}
// ERROR: "User does not have the role ADMIN"
```

### 📊 Ejemplo de Base de Datos

```sql
-- Tabla wallet después de que Marco y María registran sus wallets

wallet_id | user_id    | address       | role        | is_primary
----------|------------|---------------|-------------|------------
uuid-1    | marco-123  | GAAAA...XXX  | CONTRIBUTOR | true
uuid-2    | marco-123  | GAAAA...XXX  | MAINTAINER  | true
uuid-3    | marco-123  | GBBB...YYY   | CONTRIBUTOR | false
uuid-4    | maria-456  | GCCC...ZZZ   | CONTRIBUTOR | true

-- Nota:
-- - Marco usa GAAAA...XXX para ambos roles (2 registros)
-- - Marco tiene una segunda wallet GBBB...YYY solo para CONTRIBUTOR
-- - María tiene su propia wallet GCCC...ZZZ
-- - María NO puede registrar GAAAA...XXX (es de Marco)
```

### 🔒 Regla de Oro

**Una wallet = Un usuario. Un usuario = Múltiples roles con la misma wallet.**

- ✅ Marco puede usar su wallet para CONTRIBUTOR y MAINTAINER
- ❌ María NO puede usar la wallet de Marco para nada

## Notas Adicionales

- Un usuario puede tener la **misma wallet address** para diferentes roles
- **Una wallet NO puede ser compartida** entre diferentes usuarios
- Cada rol puede tener su **propia wallet primaria**
- La validación del address ahora retorna información sobre en qué roles está registrado
- El sistema previene que se cree una wallet para un rol que el usuario no tiene
- La seguridad real de la wallet depende de las private keys (no almacenadas en DB)

