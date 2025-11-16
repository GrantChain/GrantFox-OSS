/**
 * Event emitted when a project is approved by an admin
 */
export class ProjectApprovedEvent {
  constructor(
    public readonly projectId: string,
    public readonly projectName: string,
    public readonly maintainerIds: string[],
  ) {}
}

