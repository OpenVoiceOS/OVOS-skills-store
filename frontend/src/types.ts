export interface Skill {
  [key: string]: any;
}

// Skill submission form data
export interface SkillSubmission {
  // Required fields
  skill_id: string;
  source: string;
  package_name: string;
  name: string;
  description: string;
  examples: string[];
  tags: string[];
  // Optional fields
  icon?: string;
  images?: string[];
  license?: string;
  extra_plugins?: Record<string, string[]>;
}

// Form validation errors
export interface SubmissionErrors {
  [field: string]: string | undefined;
}
