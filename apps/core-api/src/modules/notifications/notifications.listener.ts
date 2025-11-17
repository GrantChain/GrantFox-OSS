import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationsService } from './notifications.service';
import {
  ProjectApprovedEvent,
  ProjectRejectedEvent,
  MaintainerAddedEvent,
} from './events';

@Injectable()
export class NotificationsListener {
  private readonly logger = new Logger(NotificationsListener.name);

  constructor(private notificationsService: NotificationsService) {}

  /**
   * Handle project approved event
   * Creates notifications for all maintainers of the project
   */
  @OnEvent('project.approved')
  async handleProjectApproved(event: ProjectApprovedEvent) {
    this.logger.log(
      `Handling project.approved event for project: ${event.projectName}`,
    );

    try {
      // Create notification for each maintainer
      const notifications = event.maintainerIds.map((maintainerId) => ({
        user_id: maintainerId,
        type: 'PROJECT_APPROVED' as const,
        title: 'Project Approved!',
        description: `Your project "${event.projectName}" has been approved and is now active.`,
        icon: 'check-circle',
        url: `/maintainer/projects/${event.projectId}`,
        metadata: {
          projectId: event.projectId,
          projectName: event.projectName,
        },
      }));

      const result = await this.notificationsService.createMany(notifications);
      this.logger.log(
        `Created ${result.count} notifications for project approval`,
      );
    } catch (error) {
      this.logger.error(
        `Error creating notifications for project approval: ${error.message}`,
        error.stack,
      );
    }
  }

  /**
   * Handle project rejected event
   * Creates notifications for all maintainers of the project
   */
  @OnEvent('project.rejected')
  async handleProjectRejected(event: ProjectRejectedEvent) {
    this.logger.log(
      `Handling project.rejected event for project: ${event.projectName}`,
    );

    try {
      const notifications = event.maintainerIds.map((maintainerId) => ({
        user_id: maintainerId,
        type: 'PROJECT_REJECTED' as const,
        title: 'Project Rejected',
        description: `Your project "${event.projectName}" has been rejected. ${event.reason ? `Reason: ${event.reason}` : ''}`,
        icon: 'x-circle',
        url: `/maintainer/projects/${event.projectId}`,
        metadata: {
          projectId: event.projectId,
          projectName: event.projectName,
          reason: event.reason,
        },
      }));

      const result = await this.notificationsService.createMany(notifications);
      this.logger.log(
        `Created ${result.count} notifications for project rejection`,
      );
    } catch (error) {
      this.logger.error(
        `Error creating notifications for project rejection: ${error.message}`,
        error.stack,
      );
    }
  }

  /**
   * Handle maintainer added event
   * Creates a notification for the newly added maintainer
   */
  @OnEvent('maintainer.added')
  async handleMaintainerAdded(event: MaintainerAddedEvent) {
    this.logger.log(
      `Handling maintainer.added event for project: ${event.projectName}`,
    );

    try {
      await this.notificationsService.create({
        user_id: event.newMaintainerId,
        type: 'MAINTAINER_ADDED',
        title: 'Added to Project',
        description: `You've been added as a maintainer to "${event.projectName}"${event.addedByUsername ? ` by ${event.addedByUsername}` : ''}.`,
        icon: 'user-plus',
        url: `/maintainer/projects/${event.projectId}`,
        metadata: {
          projectId: event.projectId,
          projectName: event.projectName,
          addedBy: event.addedByUserId,
        },
      });

      this.logger.log(
        `Created notification for new maintainer on project: ${event.projectName}`,
      );
    } catch (error) {
      this.logger.error(
        `Error creating notification for maintainer added: ${error.message}`,
        error.stack,
      );
    }
  }
}

