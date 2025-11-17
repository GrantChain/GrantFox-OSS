# 🔔 Notifications Module

Sistema de notificaciones in-app para GrantFox OSS usando **Event-Driven Architecture**.

## 📋 Descripción

Este módulo maneja las notificaciones dentro de la aplicación mediante un sistema de eventos desacoplado. Cuando ocurren acciones importantes en el sistema (como aprobar un proyecto o agregar un maintainer), se emiten eventos que son escuchados por listeners que crean las notificaciones correspondientes.

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│  1. Admin aprueba proyecto (ProjectReviewsService)      │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  2. Emitir evento: project.approved                     │
│     EventEmitter2.emit('project.approved', event)       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  3. NotificationsListener escucha el evento             │
│     @OnEvent('project.approved')                        │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  4. Crear notificaciones en BD para cada maintainer     │
│     NotificationsService.createMany()                   │
└─────────────────────────────────────────────────────────┘
```

## 📦 Estructura del Módulo

```
notifications/
├── notifications.module.ts          # Módulo principal
├── notifications.controller.ts      # Endpoints REST
├── notifications.service.ts         # Lógica de negocio
├── notifications.listener.ts        # Event listeners
├── events/                          # Clases de eventos
│   ├── project-approved.event.ts
│   ├── project-rejected.event.ts
│   ├── maintainer-added.event.ts
│   └── index.ts
└── dto/                             # Data Transfer Objects
    ├── notification-response.dto.ts
    ├── create-notification.dto.ts
    └── unread-count-response.dto.ts
```

## 🎯 Eventos Implementados

### 1. `project.approved`
**Cuándo se emite:** Cuando un admin aprueba un proyecto  
**Quién lo emite:** `ProjectReviewsService.createReview()`  
**Quién lo escucha:** `NotificationsListener.handleProjectApproved()`  
**Notificación creada para:** Todos los maintainers del proyecto

### 2. `project.rejected`
**Cuándo se emite:** Cuando un admin rechaza un proyecto  
**Quién lo emite:** `ProjectReviewsService.createReview()`  
**Quién lo escucha:** `NotificationsListener.handleProjectRejected()`  
**Notificación creada para:** Todos los maintainers del proyecto

### 3. `maintainer.added`
**Cuándo se emite:** Cuando se agrega un maintainer a un proyecto  
**Quién lo emite:** `ProjectsService.addMaintainer()`  
**Quién lo escucha:** `NotificationsListener.handleMaintainerAdded()`  
**Notificación creada para:** El maintainer recién agregado

## 🔌 Endpoints REST

### Obtener notificaciones de un usuario
```http
GET /api/notifications/user/:userId?unread=true
```

### Obtener contador de no leídas
```http
GET /api/notifications/user/:userId/unread-count
```

### Obtener una notificación específica
```http
GET /api/notifications/:id
```

### Marcar como leída
```http
PATCH /api/notifications/:id/read
```

### Marcar todas como leídas
```http
PATCH /api/notifications/user/:userId/read-all
```

### Eliminar notificación
```http
DELETE /api/notifications/:id
```

### Eliminar todas las notificaciones
```http
DELETE /api/notifications/user/:userId/all
```

## 🔐 Autenticación

- **Rutas públicas (GET):** Lectura de notificaciones
- **Rutas protegidas (PATCH/DELETE):** Modificar/eliminar notificaciones (requiere auth)

## 💾 Modelo de Datos

```prisma
model Notification {
  notification_id String           @id @default(uuid())
  user_id         String           @db.Uuid
  type            NotificationType
  title           String
  description     String
  icon            String?
  url             String?
  is_read         Boolean          @default(false)
  metadata        Json?            // Datos adicionales en JSON
  created_at      DateTime         @default(now())
  updated_at      DateTime         @updatedAt

  user User @relation(...)

  @@index([user_id, is_read])
  @@index([user_id, created_at])
}

enum NotificationType {
  PROJECT_APPROVED
  PROJECT_REJECTED
  MAINTAINER_ADDED
}
```

## 🚀 Cómo Agregar un Nuevo Evento

### 1. Crear la clase del evento
```typescript
// events/campaign-started.event.ts
export class CampaignStartedEvent {
  constructor(
    public readonly campaignId: string,
    public readonly campaignName: string,
    public readonly maintainerIds: string[],
  ) {}
}
```

### 2. Agregar al enum en Prisma
```prisma
enum NotificationType {
  // ... otros tipos
  CAMPAIGN_STARTED
}
```

### 3. Emitir el evento desde el servicio
```typescript
// campaigns.service.ts
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CampaignStartedEvent } from '../notifications/events';

constructor(
  private prisma: PrismaService,
  private eventEmitter: EventEmitter2,
) {}

async startCampaign(id: string) {
  // ... lógica de negocio
  
  this.eventEmitter.emit(
    'campaign.started',
    new CampaignStartedEvent(id, campaign.name, maintainerIds),
  );
}
```

### 4. Crear el listener
```typescript
// notifications.listener.ts
@OnEvent('campaign.started')
async handleCampaignStarted(event: CampaignStartedEvent) {
  const notifications = event.maintainerIds.map(id => ({
    user_id: id,
    type: 'CAMPAIGN_STARTED',
    title: '🚀 Campaign Started!',
    description: `Campaign "${event.campaignName}" has started.`,
    icon: 'rocket',
    url: `/campaigns/${event.campaignId}`,
    metadata: { campaignId: event.campaignId },
  }));

  await this.notificationsService.createMany(notifications);
}
```

### 5. Regenerar Prisma Client
```bash
npx prisma generate
```

## 🧪 Testing

```typescript
describe('NotificationsListener', () => {
  it('should create notifications when project is approved', async () => {
    const event = new ProjectApprovedEvent(
      'project-123',
      'My Project',
      ['user-1', 'user-2'],
    );

    await listener.handleProjectApproved(event);

    expect(notificationsService.createMany).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'PROJECT_APPROVED',
          user_id: 'user-1',
        }),
      ]),
    );
  });
});
```

## 📊 Ventajas de este Approach

✅ **Desacoplado:** Los módulos no dependen directamente de NotificationsService  
✅ **Testeable:** Fácil hacer unit tests de listeners  
✅ **Escalable:** Fácil agregar más eventos y listeners  
✅ **Flexible:** Metadata JSON para datos adicionales  
✅ **Type-safe:** TypeScript en todo el flujo  
✅ **Preparado para real-time:** Fácil agregar WebSockets después

## 🔮 Futuras Mejoras

- [ ] **WebSockets:** Notificaciones en tiempo real con Socket.IO
- [ ] **Push Notifications:** Integración con servicios push
- [ ] **Email Notifications:** Enviar emails para eventos importantes
- [ ] **Notification Preferences:** Permitir a usuarios configurar qué notificaciones recibir
- [ ] **Message Queue:** Migrar a Redis/BullMQ para mayor escalabilidad
- [ ] **Notification Templates:** Sistema de plantillas para notificaciones

## 📚 Documentación Adicional

- [Swagger Docs](http://localhost:3000/api/docs) - Documentación interactiva de la API
- [NestJS Event Emitter](https://docs.nestjs.com/techniques/events) - Documentación oficial
- [Prisma Schema](../../prisma/schema.prisma) - Schema completo de la base de datos

