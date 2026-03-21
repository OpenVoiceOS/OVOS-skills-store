import type { SkillSubmission, SubmissionErrors } from '../types';

// Validate skill_id format: lowercase, hyphens, with domain suffix
export function validateSkillId(value: string): string | undefined {
  if (!value) return 'Skill ID is required';
  if (!/^[a-z0-9-]+\.[a-z0-9.-]+$/.test(value)) {
    return 'Format: skill-name.domain (e.g., skill-weather.openvoiceos)';
  }
  return undefined;
}

// Validate GitHub URL
export function validateSource(value: string): string | undefined {
  if (!value) return 'Source URL is required';
  try {
    const url = new URL(value);
    if (url.hostname !== 'github.com') {
      return 'Must be a GitHub repository URL';
    }
  } catch {
    return 'Invalid URL format';
  }
  return undefined;
}

// Validate pip package name
export function validatePackageName(value: string): string | undefined {
  if (!value) return 'Package name is required';
  if (!/^[a-z][a-z0-9-]*$/.test(value)) {
    return 'Lowercase, start with letter, use hyphens only';
  }
  return undefined;
}

// Validate name
export function validateName(value: string): string | undefined {
  if (!value) return 'Name is required';
  if (value.length < 3) return 'At least 3 characters';
  if (value.length > 100) return 'Maximum 100 characters';
  return undefined;
}

// Validate description
export function validateDescription(value: string): string | undefined {
  if (!value) return 'Description is required';
  if (value.length < 10) return 'At least 10 characters';
  if (value.length > 500) return 'Maximum 500 characters';
  return undefined;
}

// Validate examples array
export function validateExamples(value: string[]): string | undefined {
  const filtered = value.filter(e => e.trim().length > 0);
  if (filtered.length < 1) return 'At least 1 voice command example required';
  return undefined;
}

// Validate tags array
export function validateTags(value: string[]): string | undefined {
  if (!value || value.length < 1) return 'At least one tag required';
  return undefined;
}

// Validate icon (must be a non-empty icon name)
export function validateIcon(value: string | undefined): string | undefined {
  if (!value) return 'Icon is required';
  if (value.startsWith('http')) return 'Please select an icon from the icon picker';
  return undefined;
}

// Validate optional URL field
export function validateUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    new URL(value);
    return undefined;
  } catch {
    return 'Invalid URL format';
  }
}

// Validate entire submission form
export function validateSubmission(data: Partial<SkillSubmission>): SubmissionErrors {
  const errors: SubmissionErrors = {};

  errors.skill_id = validateSkillId(data.skill_id || '');
  errors.source = validateSource(data.source || '');
  errors.package_name = validatePackageName(data.package_name || '');
  errors.name = validateName(data.name || '');
  errors.description = validateDescription(data.description || '');
  errors.examples = validateExamples(data.examples || []);
  errors.tags = validateTags(data.tags || []);
  errors.icon = validateIcon(data.icon);

  // Remove undefined errors
  Object.keys(errors).forEach(key => {
    if (errors[key] === undefined) delete errors[key];
  });

  return errors;
}

// Check if form is valid
export function isFormValid(errors: SubmissionErrors): boolean {
  return Object.keys(errors).length === 0;
}

// Generate skill_id from name
export function generateSkillId(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  return slug ? `skill-${slug}.openvoiceos` : '';
}

// Generate package_name from name
export function generatePackageName(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  return slug ? `ovos-skill-${slug}` : '';
}

// Extract repo name and username from GitHub URL
// Returns { repoName, username } or null if invalid
export function parseGitHubUrl(url: string): { repoName: string; username: string } | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== 'github.com') return null;

    // Path is like /username/repo-name or /username/repo-name.git
    const parts = parsed.pathname.split('/').filter(p => p.length > 0);
    if (parts.length < 2) return null;

    const username = parts[0].toLowerCase();
    let repoName = parts[1].toLowerCase();

    // Remove .git suffix if present
    if (repoName.endsWith('.git')) {
      repoName = repoName.slice(0, -4);
    }

    return { repoName, username };
  } catch {
    return null;
  }
}

// Generate skill_id from GitHub URL: repo-name.username
export function generateSkillIdFromGitHub(url: string): string {
  const parsed = parseGitHubUrl(url);
  if (!parsed) return '';
  return `${parsed.repoName}.${parsed.username}`;
}

// Generate package_name from GitHub repo name
export function generatePackageNameFromGitHub(url: string): string {
  const parsed = parseGitHubUrl(url);
  if (!parsed) return '';
  // If repo already starts with skill- or ovos-, use it directly
  // Otherwise, add ovos-skill- prefix
  const repo = parsed.repoName;
  if (repo.startsWith('ovos-skill-') || repo.startsWith('skill-')) {
    return repo;
  }
  return `ovos-skill-${repo}`;
}
