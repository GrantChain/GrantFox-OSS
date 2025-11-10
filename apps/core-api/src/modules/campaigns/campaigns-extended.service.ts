import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CampaignStatus, ProjectStatus } from '@prisma/client';

export interface GitHubRepoData {
  stars: number;
  forks: number;
  open_issues: number;
  language: string | null;
  topics: string[];
  last_updated: string;
}

@Injectable()
export class CampaignsExtendedService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Obtiene una campaña con todos sus proyectos y repos
   * Incluye metadata básica de GitHub
   */
  async getCampaignWithProjectsAndRepos(campaignId: string) {
    // Verificar que la campaña existe
    const campaign = await this.prisma.campaign.findUnique({
      where: { campaign_id: campaignId },
      include: {
        contributors: {
          include: {
            contributor: {
              select: {
                user_id: true,
                email: true,
                username: true,
                avatar_url: true,
              },
            },
          },
        },
      },
    });

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${campaignId} not found`);
    }

    // Obtener repos de la campaña con sus proyectos
    const campaignRepos = await this.prisma.campaignRepository.findMany({
      where: {
        campaign_id: campaignId,
        repository: {
          is_active: true,
          project: {
            status: ProjectStatus.APPROVED,
          },
        },
      },
      include: {
        repository: {
          include: {
            project: {
              include: {
                maintainers: {
                  where: { is_active: true },
                  include: {
                    maintainer: {
                      select: {
                        user_id: true,
                        email: true,
                        username: true,
                        avatar_url: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // Agrupar repos por proyecto
    const projectsMap = new Map();

    for (const cr of campaignRepos) {
      const project = cr.repository.project;
      const projectId = project.project_id;

      if (!projectsMap.has(projectId)) {
        projectsMap.set(projectId, {
          project_id: project.project_id,
          name: project.name,
          github_handle: project.github_handle,
          short_description: project.short_description,
          description: project.description,
          tech_stack: project.tech_stack,
          category: project.category,
          maintainers: project.maintainers.map((m) => ({
            user_id: m.maintainer.user_id,
            email: m.maintainer.email,
            username: m.maintainer.username,
            avatar_url: m.maintainer.avatar_url,
            is_owner: m.is_owner,
          })),
          repositories: [],
        });
      }

      // Agregar repo al proyecto
      const projectData = projectsMap.get(projectId);
      projectData.repositories.push({
        github_repo_id: Number(cr.repository.github_repo_id),
        name: cr.repository.name,
        github_url: cr.repository.github_url,
        description: cr.repository.description,
        added_to_campaign_at: cr.created_at,
      });
    }

    return {
      campaign: {
        campaign_id: campaign.campaign_id,
        name: campaign.name,
        description: campaign.description,
        tags: campaign.tags,
        start_date: campaign.start_date,
        end_date: campaign.end_date,
        status: campaign.status,
        image_url: campaign.image_url,
        contributors: campaign.contributors.map((c) => ({
          user_id: c.contributor.user_id,
          email: c.contributor.email,
          username: c.contributor.username,
          avatar_url: c.contributor.avatar_url,
          registered_at: c.registered_at,
        })),
      },
      projects: Array.from(projectsMap.values()),
      total_projects: projectsMap.size,
      total_repositories: campaignRepos.length,
      total_contributors: campaign.contributors.length,
    };
  }

  /**
   * Obtiene metadata de GitHub para un repositorio
   * Este endpoint puede ser llamado on-demand desde el frontend
   */
  async getRepositoryGitHubData(repoId: number): Promise<GitHubRepoData | null> {
    // Verificar que el repo existe
    const repository = await this.prisma.repository.findUnique({
      where: { github_repo_id: repoId },
    });

    if (!repository) {
      throw new NotFoundException(`Repository with ID ${repoId} not found`);
    }

    try {
      // Extraer owner/repo desde la URL de GitHub
      const urlParts = repository.github_url.split('/');
      const owner = urlParts[urlParts.length - 2];
      const repo = urlParts[urlParts.length - 1];

      // Preparar headers con token si existe
      const headers: Record<string, string> = {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'GrantFox-API',
      };

      // Agregar token si está configurado
      if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
      }

      // Llamar GitHub API usando owner/repo (más confiable)
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`,
        { headers },
      );

      if (!response.ok) {
        console.error(`GitHub API error: ${response.status} for ${owner}/${repo}`);
        return null;
      }

      const data = await response.json();

      return {
        stars: data.stargazers_count || 0,
        forks: data.forks_count || 0,
        open_issues: data.open_issues_count || 0,
        language: data.language || null,
        topics: data.topics || [],
        last_updated: data.updated_at || data.pushed_at,
      };
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      return null;
    }
  }

  /**
   * Obtiene issues de GitHub para un repositorio
   * Este endpoint puede ser llamado cuando el usuario hace click en un repo
   */
  async getRepositoryGitHubIssues(repoId: number) {
    // Verificar que el repo existe
    const repository = await this.prisma.repository.findUnique({
      where: { github_repo_id: repoId },
      include: {
        project: {
          select: {
            github_handle: true,
          },
        },
      },
    });

    if (!repository) {
      throw new NotFoundException(`Repository with ID ${repoId} not found`);
    }

    try {
      // Obtener owner/repo desde la URL de GitHub
      const urlParts = repository.github_url.split('/');
      const owner = urlParts[urlParts.length - 2];
      const repo = urlParts[urlParts.length - 1];

      // Preparar headers con token si existe
      const headers: Record<string, string> = {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'GrantFox-API',
      };

      // Agregar token si está configurado
      if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
      }

      // Llamar GitHub API para issues
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues?state=open&per_page=50`,
        { headers },
      );

      if (!response.ok) {
        console.error(`GitHub API error: ${response.status}`);
        return {
          repository_id: repoId,
          repository_name: repository.name,
          issues: [],
          error: 'Failed to fetch issues from GitHub',
        };
      }

      const issues = await response.json();

      return {
        repository_id: repoId,
        repository_name: repository.name,
        github_url: repository.github_url,
        issues: issues.map((issue: any) => ({
          id: issue.id,
          number: issue.number,
          title: issue.title,
          state: issue.state,
          labels: issue.labels.map((l: any) => l.name),
          created_at: issue.created_at,
          updated_at: issue.updated_at,
          html_url: issue.html_url,
          user: {
            login: issue.user.login,
            avatar_url: issue.user.avatar_url,
          },
        })),
        total_issues: issues.length,
      };
    } catch (error) {
      console.error('Error fetching GitHub issues:', error);
      return {
        repository_id: repoId,
        repository_name: repository.name,
        issues: [],
        error: 'Failed to fetch issues from GitHub',
      };
    }
  }

  /**
   * Obtiene todas las campañas activas con proyectos y repos
   * Para el landing page de contributors
   */
  async getActiveCampaignsWithProjects() {
    const activeCampaigns = await this.prisma.campaign.findMany({
      where: {
        status: CampaignStatus.ACTIVE,
      },
      orderBy: {
        start_date: 'desc',
      },
    });

    const campaignsWithProjects = await Promise.all(
      activeCampaigns.map(async (campaign) => {
        const data = await this.getCampaignWithProjectsAndRepos(
          campaign.campaign_id,
        );
        return data;
      }),
    );

    return {
      campaigns: campaignsWithProjects,
      total_campaigns: campaignsWithProjects.length,
    };
  }

  /**
   * Obtiene TODA la información de un repositorio en 1 solo request
   * Incluye: repo info + GitHub metadata + GitHub issues
   * Ideal para la página de detalles del repo
   */
  async getRepositoryFullDetails(repoId: number) {
    // Verificar que el repo existe
    const repository = await this.prisma.repository.findUnique({
      where: { github_repo_id: repoId },
      include: {
        project: {
          select: {
            project_id: true,
            name: true,
            github_handle: true,
            short_description: true,
            category: true,
          },
        },
      },
    });

    if (!repository) {
      throw new NotFoundException(`Repository with ID ${repoId} not found`);
    }

    // Cargar GitHub data e issues en paralelo
    const [githubData, issuesData] = await Promise.all([
      this.getRepositoryGitHubData(repoId),
      this.getRepositoryGitHubIssues(repoId),
    ]);

    return {
      repository: {
        github_repo_id: Number(repository.github_repo_id),
        name: repository.name,
        github_url: repository.github_url,
        description: repository.description,
        is_active: repository.is_active,
        project: repository.project,
      },
      github_data: githubData,
      issues: issuesData.issues || [],
      total_issues: issuesData.total_issues || 0,
    };
  }
}
