/**
 * Event emitted when changes are requested for a project
 */
export class ProjectChangesRequestedEvent {
  constructor(
    public readonly projectId: string,
    public readonly projectName: string,
    public readonly maintainerIds: string[],
    public readonly reason?: string,
  ) {}
}

