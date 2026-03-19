import { useState, useMemo } from 'react';
import type { SkillSubmission, SubmissionErrors } from '../types';
import {
  validateSubmission,
  isFormValid,
  generateSkillIdFromGitHub,
  generatePackageNameFromGitHub,
} from '../utils/validation';
import { openSubmissionIssue, buildSkillJson } from '../utils/submitSkill';
import { getPredefinedCategories, getCategoryIcon } from '../utils/categories';

const LICENSES = [
  { value: '', label: 'Select a license (optional)' },
  { value: 'apache-2.0', label: 'Apache 2.0' },
  { value: 'mit', label: 'MIT' },
  { value: 'gpl-3.0', label: 'GPL 3.0' },
  { value: 'bsd-3-clause', label: 'BSD 3-Clause' },
  { value: 'mpl-2.0', label: 'Mozilla Public License 2.0' },
  { value: 'unlicense', label: 'Unlicense' },
];

const initialFormState: SkillSubmission = {
  skill_id: '',
  source: '',
  package_name: '',
  name: '',
  description: '',
  examples: [''],
  tags: [],
  icon: '',
  images: [],
  license: '',
};

const SubmitPage = () => {
  const [formData, setFormData] = useState<SkillSubmission>(initialFormState);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPreview, setShowPreview] = useState(false);
  const [customTag, setCustomTag] = useState('');

  const predefinedTags = getPredefinedCategories();

  const errors = useMemo(() => validateSubmission(formData), [formData]);
  const canSubmit = isFormValid(errors);

  const handleChange = (field: keyof SkillSubmission, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Auto-fill skill_id and package_name from GitHub URL on blur
  const handleSourceBlur = () => {
    handleBlur('source');
    if (formData.source && !formData.skill_id) {
      const skillId = generateSkillIdFromGitHub(formData.source);
      if (skillId) {
        setFormData(prev => ({ ...prev, skill_id: skillId }));
      }
    }
    if (formData.source && !formData.package_name) {
      const packageName = generatePackageNameFromGitHub(formData.source);
      if (packageName) {
        setFormData(prev => ({ ...prev, package_name: packageName }));
      }
    }
  };

  const handleExampleChange = (index: number, value: string) => {
    const newExamples = [...formData.examples];
    newExamples[index] = value;
    setFormData(prev => ({ ...prev, examples: newExamples }));
  };

  const addExample = () => {
    setFormData(prev => ({ ...prev, examples: [...prev.examples, ''] }));
  };

  const removeExample = (index: number) => {
    if (formData.examples.length > 1) {
      const newExamples = formData.examples.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, examples: newExamples }));
    }
  };

  const toggleTag = (tag: string) => {
    const newTags = formData.tags.includes(tag)
      ? formData.tags.filter(t => t !== tag)
      : [...formData.tags, tag];
    setFormData(prev => ({ ...prev, tags: newTags }));
  };

  const addCustomTag = () => {
    const tag = customTag.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
      setCustomTag('');
    }
  };

  const handleCustomTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomTag();
    }
  };

  const handleSubmit = () => {
    if (canSubmit) {
      openSubmissionIssue(formData);
    }
  };

  const getError = (field: keyof SubmissionErrors): string | undefined => {
    return touched[field] ? errors[field] : undefined;
  };

  const inputClasses = (field: string) =>
    `w-full px-4 py-2.5 rounded-lg border ${
      getError(field as keyof SubmissionErrors)
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-200 dark:border-gray-600 focus:ring-red-500'
    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all`;

  const labelClasses = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5';

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Submit a Skill
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Share your skill with the OVOS community. Fill out the form below and submit via GitHub.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Basic Information
            </h2>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className={labelClasses}>
                  Skill Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  placeholder="e.g., Weather Forecast"
                  className={inputClasses('name')}
                />
                {getError('name') && (
                  <p className="mt-1 text-sm text-red-500">{getError('name')}</p>
                )}
              </div>

              {/* Source Repository - moved up for auto-fill */}
              <div>
                <label className={labelClasses}>
                  Source Repository <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={formData.source}
                  onChange={e => handleChange('source', e.target.value)}
                  onBlur={handleSourceBlur}
                  placeholder="https://github.com/username/skill-repo"
                  className={inputClasses('source')}
                />
                {getError('source') && (
                  <p className="mt-1 text-sm text-red-500">{getError('source')}</p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Skill ID and package name will be auto-filled from this URL
                </p>
              </div>

              {/* Skill ID */}
              <div>
                <label className={labelClasses}>
                  Skill ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.skill_id}
                  onChange={e => handleChange('skill_id', e.target.value.toLowerCase())}
                  onBlur={() => handleBlur('skill_id')}
                  placeholder="e.g., skill-weather.username"
                  className={inputClasses('skill_id')}
                />
                {getError('skill_id') && (
                  <p className="mt-1 text-sm text-red-500">{getError('skill_id')}</p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Format: repo-name.username (auto-filled from GitHub URL)
                </p>
              </div>

              {/* Package Name */}
              <div>
                <label className={labelClasses}>
                  Package Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.package_name}
                  onChange={e => handleChange('package_name', e.target.value.toLowerCase())}
                  onBlur={() => handleBlur('package_name')}
                  placeholder="e.g., ovos-skill-weather"
                  className={inputClasses('package_name')}
                />
                {getError('package_name') && (
                  <p className="mt-1 text-sm text-red-500">{getError('package_name')}</p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  The pip package name for installation
                </p>
              </div>

              {/* Description */}
              <div>
                <label className={labelClasses}>
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={e => handleChange('description', e.target.value)}
                  onBlur={() => handleBlur('description')}
                  placeholder="Describe what your skill does..."
                  rows={3}
                  className={inputClasses('description')}
                />
                <div className="mt-1 flex justify-between">
                  {getError('description') && (
                    <p className="text-sm text-red-500">{getError('description')}</p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400 ml-auto">
                    {formData.description.length}/500
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Voice Command Examples */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Voice Command Examples <span className="text-red-500">*</span>
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Add at least 1 example voice command that users can say to activate your skill.
            </p>

            <div className="space-y-3">
              {formData.examples.map((example, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={example}
                    onChange={e => handleExampleChange(index, e.target.value)}
                    onBlur={() => handleBlur('examples')}
                    placeholder={`Example ${index + 1}: "What's the weather like?"`}
                    className={inputClasses('examples')}
                  />
                  {formData.examples.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExample(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              {getError('examples') && touched.examples && (
                <p className="text-sm text-red-500">{getError('examples')}</p>
              )}
              <button
                type="button"
                onClick={addExample}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add another example
              </button>
            </div>
          </section>

          {/* Category Tags */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Category Tags <span className="text-red-500">*</span>
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Select categories or add custom tags to describe your skill.
            </p>

            {/* Predefined tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {predefinedTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                    formData.tags.includes(tag)
                      ? 'bg-red-600 border-red-600 text-white'
                      : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-red-400'
                  }`}
                >
                  {getCategoryIcon(tag)}
                  <span className="capitalize">{tag}</span>
                </button>
              ))}
            </div>

            {/* Custom tag input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={customTag}
                onChange={e => setCustomTag(e.target.value)}
                onKeyDown={handleCustomTagKeyDown}
                placeholder="Add custom tag..."
                className={inputClasses('customTag')}
              />
              <button
                type="button"
                onClick={addCustomTag}
                disabled={!customTag.trim()}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white disabled:text-gray-500 rounded-lg font-medium transition-colors"
              >
                Add
              </button>
            </div>

            {/* Selected tags display */}
            {formData.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className="hover:text-red-900 dark:hover:text-red-100"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
            {getError('tags') && touched.tags && (
              <p className="mt-2 text-sm text-red-500">{getError('tags')}</p>
            )}
          </section>

          {/* Optional Fields */}
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Optional Information
            </h2>

            <div className="space-y-4">
              {/* Icon URL */}
              <div>
                <label className={labelClasses}>Icon URL</label>
                <input
                  type="url"
                  value={formData.icon || ''}
                  onChange={e => handleChange('icon', e.target.value)}
                  onBlur={() => handleBlur('icon')}
                  placeholder="https://example.com/icon.svg"
                  className={inputClasses('icon')}
                />
                {getError('icon') && (
                  <p className="mt-1 text-sm text-red-500">{getError('icon')}</p>
                )}
                {formData.icon && !getError('icon') && (
                  <div className="mt-2 flex items-center gap-2">
                    <img
                      src={formData.icon}
                      alt="Skill icon preview"
                      className="w-8 h-8 rounded"
                      onError={e => (e.currentTarget.style.display = 'none')}
                    />
                    <span className="text-xs text-gray-500">Icon preview</span>
                  </div>
                )}
              </div>

              {/* License */}
              <div>
                <label className={labelClasses}>License</label>
                <select
                  value={formData.license || ''}
                  onChange={e => handleChange('license', e.target.value)}
                  className={inputClasses('license')}
                >
                  {LICENSES.map(license => (
                    <option key={license.value} value={license.value}>
                      {license.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* JSON Preview */}
          <section>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium text-sm transition-colors"
            >
              <svg
                className={`w-4 h-4 transition-transform ${showPreview ? 'rotate-90' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {showPreview ? 'Hide' : 'Show'} JSON Preview
            </button>

            {showPreview && (
              <pre className="mt-3 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg text-sm text-gray-800 dark:text-gray-200 overflow-x-auto border border-gray-200 dark:border-gray-700">
                {JSON.stringify(buildSkillJson(formData), null, 2)}
              </pre>
            )}
          </section>
        </div>

        {/* Submit Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Clicking submit will open a GitHub issue with your skill data.
            </p>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                canSubmit
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              }`}
            >
              Submit via GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitPage;
