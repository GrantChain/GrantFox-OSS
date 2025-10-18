# Users Module

Módulo completo para la gestión de usuarios en GrantFox.

## Características

- ✅ Crear usuarios con roles específicos
- ✅ Gestión de roles (agregar/eliminar sin sobreescribir)
- ✅ Borrado lógico (soft delete)
- ✅ Actualización de información básica
- ✅ Búsqueda por múltiples criterios (ID, email, username, role)
- ✅ Validación completa con class-validator
- ✅ Documentación Swagger

## Endpoints

### 1. Crear Usuario
**POST** `/api/users`

Crea un nuevo usuario con un rol inicial.

```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "avatar_url": "https://example.com/avatar.jpg",
  "role": "CONTRIBUTOR"
}
```

**Roles disponibles:** `ADMIN`, `MAINTAINER`, `CONTRIBUTOR`

---

### 2. Listar Usuarios
**GET** `/api/users?includeInactive=false`

Lista todos los usuarios activos (por defecto). Usa `includeInactive=true` para incluir usuarios inactivos.

---

### 3. Obtener Usuario por ID
**GET** `/api/users/:id`

Retorna un usuario específico con todos sus perfiles relacionados (maintainer, contributor, admin) y wallets.

---

### 4. Obtener Usuario por Email
**GET** `/api/users/by-email/:email`

Busca un usuario por su email.

---

### 5. Obtener Usuario por Username
**GET** `/api/users/by-username/:username`

Busca un usuario por su username.

---

### 6. Obtener Usuarios por Role
**GET** `/api/users/by-role/:role`

Lista todos los usuarios activos con un rol específico.

**Ejemplo:** `/api/users/by-role/MAINTAINER`

---

### 7. Actualizar Usuario
**PUT** `/api/users/:id`

Actualiza información básica del usuario (username, avatar_url).

```json
{
  "username": "newusername",
  "avatar_url": "https://example.com/new-avatar.jpg"
}
```

---

### 8. Agregar Role
**POST** `/api/users/:id/roles`

Agrega un nuevo rol al usuario **sin sobreescribir** los roles existentes.

```json
{
  "role": "MAINTAINER"
}
```

**Importante:** Si el usuario ya tiene el rol, retorna error 400.

---

### 9. Eliminar Role
**DELETE** `/api/users/:id/roles/:role`

Elimina un rol específico del usuario.

**Ejemplo:** `DELETE /api/users/123/roles/CONTRIBUTOR`

**Restricción:** El usuario debe mantener al menos un rol.

---

### 10. Desactivar Usuario (Soft Delete)
**PATCH** `/api/users/:id/deactivate`

Realiza un borrado lógico estableciendo `is_active = false`.

---

### 11. Reactivar Usuario
**PATCH** `/api/users/:id/reactivate`

Reactiva un usuario desactivado estableciendo `is_active = true`.

---

## Validaciones

### CreateUserDto
- `email`: Email válido, requerido, único
- `username`: String opcional, único si se proporciona
- `avatar_url`: URL válida opcional
- `role`: Enum UserRole requerido

### UpdateUserDto
- `username`: String opcional, único
- `avatar_url`: URL válida opcional

### AddRoleDto
- `role`: Enum UserRole requerido

## Respuestas de Error

- **400 Bad Request**: Validación fallida o lógica de negocio (ej: usuario ya tiene el rol)
- **404 Not Found**: Usuario no encontrado
- **409 Conflict**: Email o username ya existe

## Swagger Documentation

Accede a la documentación interactiva en:
```
http://localhost:3000/api/docs
```

## Ejemplos de Uso

### Crear un Contributor
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "contributor@example.com",
    "username": "contributor1",
    "role": "CONTRIBUTOR"
  }'
```

### Agregar rol de Maintainer
```bash
curl -X POST http://localhost:3000/api/users/{user_id}/roles \
  -H "Content-Type: application/json" \
  -d '{
    "role": "MAINTAINER"
  }'
```

### Desactivar usuario
```bash
curl -X PATCH http://localhost:3000/api/users/{user_id}/deactivate
```

## Notas Técnicas

- Los roles se almacenan como un array en PostgreSQL
- El borrado es lógico, no se eliminan registros de la base de datos
- Todos los endpoints tienen validación automática con class-validator
- Las respuestas incluyen timestamps (created_at, updated_at)
- Los UUIDs se generan automáticamente para nuevos usuarios
