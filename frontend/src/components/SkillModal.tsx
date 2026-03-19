'use client';

import { useState } from 'react';
import SkillInfoModal from './SkillInfoModal';
import InstallModal from './InstallModal';
import type { Skill } from '../types';

interface SkillModalProps {
  skill: Skill | null;
  isOpen: boolean;
  onClose: () => void;
}

const SkillModal = ({ skill, isOpen, onClose }: SkillModalProps) => {
  const [showInstallModal, setShowInstallModal] = useState(false);

  const handleInstall = () => {
    setShowInstallModal(true);
  };

  const handleCloseInstall = () => {
    setShowInstallModal(false);
  };

  if (!isOpen || !skill) return null;

  return (
    <>
      <SkillInfoModal
        skill={skill}
        isOpen={isOpen && !showInstallModal}
        onClose={onClose}
        onInstall={skill.skill_id ? handleInstall : undefined}
      />

      {showInstallModal && skill.skill_id && (
        <InstallModal
          skillId={skill.skill_id}
          skillName={skill.name || 'Unknown Skill'}
          skillSource={skill.source}
          skillPackageName={skill.package_name}
          skillDescription={skill.description}
          skillTags={skill.tags}
          isOpen={showInstallModal}
          onClose={handleCloseInstall}
        />
      )}
    </>
  );
};

export default SkillModal;
