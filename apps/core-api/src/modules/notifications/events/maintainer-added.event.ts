/**
 * Event emitted when a maintainer is added to a project
 */
export class MaintainerAddedEvent {
  constructor(
    public readonly projectId: string,
    public readonly projectName: string,
    public readonly newMaintainerId: string,
    public readonly addedByUserId: string,
    public readonly addedByUsername?: string,
  ) {}
}

