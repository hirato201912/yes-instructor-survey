'use client'

import { SurveyData, SKILL_LEVELS, PC_BASICS, AI_TOOLS, DESIGN_TOOLS, SNS_MARKETING, ENGLISH_SKILLS, ACCOUNTING_SKILLS, SkillLevel } from '@/types/survey'
import SegmentControl from './SegmentControl'
import Accordion from './Accordion'

interface Props {
  data: SurveyData
  onChange: (data: Partial<SurveyData>) => void
  onNext: () => void
  onBack: () => void
}

type SkillCategory = 'pc_basics' | 'ai_tools' | 'design' | 'sns_marketing' | 'english' | 'accounting'

export default function Step2({ data, onChange, onNext, onBack }: Props) {
  const updateSkill = (category: SkillCategory, skill: string, value: SkillLevel) => {
    onChange({
      skills: {
        ...data.skills,
        [category]: {
          ...data.skills[category],
          [skill]: value,
        },
      },
    })
  }

  const renderSkills = (category: SkillCategory, skills: string[]) => (
    <div className="space-y-3">
      {skills.map(skill => (
        <div key={skill}>
          <div className="text-sm text-gray-600 mb-1">{skill}</div>
          <SegmentControl
            options={SKILL_LEVELS}
            value={data.skills[category][skill] ?? 'none'}
            onChange={(val) => updateSkill(category, skill, val)}
            colorScheme="skill"
          />
        </div>
      ))}
    </div>
  )

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-2">興味・スキル</h2>
      <p className="text-xs text-gray-400 mb-4">「興味あり」だけでも大歓迎です！気軽に選んでください</p>

      <Accordion title="デザイン系" defaultOpen={true}>
        {renderSkills('design', DESIGN_TOOLS)}
      </Accordion>

      <Accordion title="SNS・マーケティング">
        {renderSkills('sns_marketing', SNS_MARKETING)}
      </Accordion>

      <Accordion title="基本PCスキル">
        {renderSkills('pc_basics', PC_BASICS)}
      </Accordion>

      <Accordion title="英語・英語教育">
        {renderSkills('english', ENGLISH_SKILLS)}
      </Accordion>

      <Accordion title="AIツール">
        {renderSkills('ai_tools', AI_TOOLS)}
      </Accordion>

      <Accordion title="会計・経理">
        {renderSkills('accounting', ACCOUNTING_SKILLS)}
      </Accordion>

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-4 border-2 border-gray-300 text-gray-600 font-bold rounded-2xl text-base active:scale-95 transition-transform"
        >
          ← 戻る
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-[2] py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-2xl text-base shadow-md active:scale-95 transition-transform"
        >
          次へ →
        </button>
      </div>
    </div>
  )
}
