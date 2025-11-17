/**
 * Event emitted when a project is rejected by an admin
 */
export class ProjectRejectedEvent {
  constructor(
    public readonly projectId: string,
    public readonly projectName: string,
    public readonly maintainerIds: string[],
    public readonly reason?: string,
  ) {}
}

