-- Script para testear endpoints de GitHub API (Compatible con Supabase)
-- IMPORTANTE: Ejecutar DESPUÉS de las migraciones de Prisma

-- Verificar que los enums existen (si no, ejecutar primero: npx prisma db push)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'UserRole') THEN
        RAISE EXCEPTION 'Enums no existen. Ejecuta primero: npx prisma db push';
    END IF;
END $$;

-- 1. Crear usuario MAINTAINER
INSERT INTO "user" (user_id, email, username, roles, is_active, created_at, updated_at)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'maintainer@grantfox.com',
  'test_maintainer',
  '{MAINTAINER}',  -- Sintaxis de array para PostgreSQL
  true,
  NOW(),
  NOW()
) ON CONFLICT (user_id) DO NOTHING;

-- 2. Crear perfil de maintainer
INSERT INTO maintainer_profile (user_id, bio, created_at, updated_at)
VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Test maintainer for API testing',
  NOW(),
  NOW()
) ON CONFLICT (user_id) DO NOTHING;

-- 3. Crear proyecto APPROVED
INSERT INTO project (
  project_id, 
  name, 
  github_handle, 
  short_description, 
  description, 
  tech_stack, 
  category, 
  status, 
  created_by,
  created_at,
  updated_at
)
VALUES (
  'b1ffbc99-9c0b-4ef8-bb6d-6bb9bd380a22',
  'Stellar Soroban Examples',
  'stellar',
  'Example smart contracts for Stellar Soroban',
  'A collection of example smart contracts demonstrating various features of the Stellar Soroban platform. Includes DeFi primitives, NFTs, and more.',
  '{Rust,Stellar,Smart Contracts,Soroban}',  -- Sintaxis de array
  'DEFI',
  'APPROVED',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  NOW(),
  NOW()
) ON CONFLICT (project_id) DO NOTHING;

-- 4. Vincular maintainer con proyecto (owner)
INSERT INTO project_maintainer (
  id,
  project_id, 
  maintainer_id, 
  is_owner, 
  is_active,
  created_at,
  updated_at
)
VALUES (
  'c2ffbc99-9c0b-4ef8-bb6d-6bb9bd380a33',
  'b1ffbc99-9c0b-4ef8-bb6d-6bb9bd380a22',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- 5. Crear repositorio con GitHub ID REAL (Stellar Soroban Examples)
-- GitHub Repo ID: 538809110 (https://github.com/stellar/soroban-examples)
INSERT INTO repository (
  github_repo_id,
  project_id,
  github_url,
  name,
  description,
  is_active,
  created_at,
  updated_at
)
VALUES (
  538809110,
  'b1ffbc99-9c0b-4ef8-bb6d-6bb9bd380a22',
  'https://github.com/stellar/soroban-examples',
  'soroban-examples',
  'Example smart contracts for Stellar Soroban',
  true,
  NOW(),
  NOW()
) ON CONFLICT (github_repo_id) DO NOTHING;

-- 6. Crear campaña ACTIVE
INSERT INTO campaign (
  campaign_id,
  name,
  description,
  tags,
  start_date,
  end_date,
  status,
  created_by,
  created_at,
  updated_at
)
VALUES (
  'd3ffbc99-9c0b-4ef8-bb6d-6bb9bd380a44',
  'Q1 2024 Stellar Grant Round',
  'Funding for innovative DeFi projects building on Stellar Soroban. We are looking for projects that push the boundaries of what is possible with smart contracts.',
  '{defi,stellar,soroban,grants}',  -- Sintaxis de array
  '2024-01-01',
  '2024-12-31',
  'ACTIVE',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  NOW(),
  NOW()
) ON CONFLICT (campaign_id) DO NOTHING;

-- 7. Vincular repositorio con campaña
INSERT INTO campaign_repository (
  campaign_id,
  repository_id,
  created_at,
  updated_at
)
VALUES (
  'd3ffbc99-9c0b-4ef8-bb6d-6bb9bd380a44',
  538809110,
  NOW(),
  NOW()
) ON CONFLICT (campaign_id, repository_id) DO NOTHING;

-- 8. Crear otro proyecto para tener más variedad
INSERT INTO project (
  project_id, 
  name, 
  github_handle, 
  short_description, 
  description, 
  tech_stack, 
  category, 
  status, 
  created_by,
  created_at,
  updated_at
)
VALUES (
  'e4ffbc99-9c0b-4ef8-bb6d-6bb9bd380a55',
  'Soroban Quest',
  'stellar',
  'Learn Soroban through interactive quests',
  'An interactive learning platform for Stellar Soroban smart contract development.',
  '{Rust,Stellar,Education}',  -- Sintaxis de array
  'TOOLING',
  'APPROVED',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  NOW(),
  NOW()
) ON CONFLICT (project_id) DO NOTHING;

-- 9. Vincular maintainer con segundo proyecto
INSERT INTO project_maintainer (
  id,
  project_id, 
  maintainer_id, 
  is_owner, 
  is_active,
  created_at,
  updated_at
)
VALUES (
  'f5ffbc99-9c0b-4ef8-bb6d-6bb9bd380a66',
  'e4ffbc99-9c0b-4ef8-bb6d-6bb9bd380a55',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  true,
  true,
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- 10. Agregar repo del segundo proyecto
-- GitHub Repo ID: 559032124 (https://github.com/stellar/soroban-quest)
INSERT INTO repository (
  github_repo_id,
  project_id,
  github_url,
  name,
  description,
  is_active,
  created_at,
  updated_at
)
VALUES (
  559032124,
  'e4ffbc99-9c0b-4ef8-bb6d-6bb9bd380a55',
  'https://github.com/stellar/soroban-quest',
  'soroban-quest',
  'Learn Soroban through interactive quests',
  true,
  NOW(),
  NOW()
) ON CONFLICT (github_repo_id) DO NOTHING;

-- 11. Agregar segundo repo a la campaña
INSERT INTO campaign_repository (
  campaign_id,
  repository_id,
  created_at,
  updated_at
)
VALUES (
  'd3ffbc99-9c0b-4ef8-bb6d-6bb9bd380a44',
  559032124,
  NOW(),
  NOW()
) ON CONFLICT (campaign_id, repository_id) DO NOTHING;

-- Verificar data insertada
SELECT 'Users created:' as info, COUNT(*) as count FROM "user" WHERE email = 'maintainer@grantfox.com'
UNION ALL
SELECT 'Projects created:', COUNT(*) FROM project WHERE status = 'APPROVED'
UNION ALL
SELECT 'Repositories created:', COUNT(*) FROM repository WHERE is_active = true
UNION ALL
SELECT 'Campaigns created:', COUNT(*) FROM campaign WHERE status = 'ACTIVE'
UNION ALL
SELECT 'Campaign-Repo links:', COUNT(*) FROM campaign_repository;
