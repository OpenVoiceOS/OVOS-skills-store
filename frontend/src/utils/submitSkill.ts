import type { SkillSubmission } from '../types';

const REPO_OWNER = 'OpenVoiceOS';
const REPO_NAME = 'OVOS-skills-store';

// Build the skill JSON for submission
export function buildSkillJson(data: SkillSubmission): object {
  const skill: Record<string, unknown> = {
    skill_id: data.skill_id,
    source: data.source,
    package_name: data.package_name,
    name: data.name,
    description: data.description,
    examples: data.examples.filter(e => e.trim().length > 0),
    tags: data.tags,
  };

  // Add optional fields only if they have values
  if (data.icon) skill.icon = data.icon;
  if (data.images && data.images.length > 0) {
    skill.images = data.images.filter(i => i.trim().length > 0);
  } else {
    skill.images = [];
  }
  if (data.license) skill.license = data.license;
  if (data.extra_plugins) skill.extra_plugins = data.extra_plugins;

  return skill;
}

// Generate GitHub Issue URL with pre-filled content
export function generateSubmissionUrl(data: SkillSubmission): string {
  const skillJson = buildSkillJson(data);
  const jsonStr = JSON.stringify(skillJson, null, 2);

  const issueTitle = `[submission] ${data.name}`;

  const issueBody = `## Skill Submission

**Submitted via OVOS Skills Store Web Interface**

### Skill Information
- **Name**: ${data.name}
- **Skill ID**: ${data.skill_id}
- **Package**: ${data.package_name}
- **Source**: ${data.source}

### JSON Payload

\`\`\`json
${jsonStr}
\`\`\`

---
*This submission will be automatically processed by the submission bot.*
`;

  const url = new URL(`https://github.com/${REPO_OWNER}/${REPO_NAME}/issues/new`);
  url.searchParams.set('title', issueTitle);
  url.searchParams.set('body', issueBody);
  url.searchParams.set('labels', 'skill-submission');

  return url.toString();
}

// Open submission in new tab
export function openSubmissionIssue(data: SkillSubmission): void {
  const url = generateSubmissionUrl(data);
  window.open(url, '_blank', 'noopener,noreferrer');
}
