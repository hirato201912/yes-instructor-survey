'use client'

import {
  SurveyData, SUBJECT_LEVELS, SKILL_LEVELS,
  ELEMENTARY_SUBJECTS, JUNIOR_HIGH_SUBJECTS, HIGH_SCHOOL_SUBJECTS,
  PC_BASICS, AI_TOOLS, DESIGN_TOOLS, SNS_MARKETING, ENGLISH_SKILLS, ACCOUNTING_SKILLS,
  SubjectLevel, SkillLevel,
} from '@/types/survey'

interface Props {
  data: SurveyData
  onBack: () => void
  onSubmit: () => void
  isSubmitting: boolean
  submitError: string
}

const subjectLevelLabel = (v: SubjectLevel) => SUBJECT_LEVELS.find(l => l.value === v)?.label ?? v
const skillLevelLabel = (v: SkillLevel) => SKILL_LEVELS.find(l => l.value === v)?.label ?? v

function SubjectSection({ title, subjects, values }: {
  title: string
  subjects: string[]
  values: Record<string, SubjectLevel>
}) {
  const nonDefault = subjects.filter(s => (values[s] ?? 'none') !== 'none')
  if (nonDefault.length === 0) return null

  return (
    <div className="mb-3">
      <p className="text-xs font-semibold text-gray-500 mb-1">{title}</p>
      <div className="space-y-1">
        {nonDefault.map(s => (
          <div key={s} className="flex justify-between text-sm">
            <span className="text-gray-700">{s}</span>
            <span className={`font-medium ${values[s] === 'confident' ? 'text-blue-600' : 'text-blue-400'}`}>
              {subjectLevelLabel(values[s])}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SkillSection({ title, skills, values }: {
  title: string
  skills: string[]
  values: Record<string, SkillLevel>
}) {
  const nonDefault = skills.filter(s => (values[s] ?? 'none') !== 'none')
  if (nonDefault.length === 0) return null

  return (
    <div className="mb-3">
      <p className="text-xs font-semibold text-gray-500 mb-1">{title}</p>
      <div className="space-y-1">
        {nonDefault.map(s => (
          <div key={s} className="flex justify-between text-sm">
            <span className="text-gray-700">{s}</span>
            <span className={`font-medium ${values[s] === 'can_do' ? 'text-orange-600' : 'text-blue-500'}`}>
              {skillLevelLabel(values[s])}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ConfirmStep({ data, onBack, onSubmit, isSubmitting, submitError }: Props) {
  const hasSubjects = Object.values(data.subjects).some(g =>
    Object.values(g).some(v => v !== 'none')
  )
  const hasSkills = Object.values(data.skills).some(g =>
    Object.values(g).some(v => v !== 'none')
  )

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-1">回答内容の確認</h2>
      <p className="text-xs text-gray-400 mb-4">内容をご確認の上、送信してください</p>

      <div className="bg-gray-50 rounded-2xl p-4 space-y-4 mb-6">
        {/* 名前 */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-1">お名前</p>
          <p className="text-base font-bold text-gray-800">{data.instructorName}</p>
        </div>

        {/* 科目 */}
        {hasSubjects && (
          <div>
            <p className="text-sm font-bold text-gray-700 border-b border-gray-200 pb-1 mb-2">指導可能科目</p>
            <SubjectSection title="小学生" subjects={ELEMENTARY_SUBJECTS} values={data.subjects.elementary} />
            <SubjectSection title="中学生" subjects={JUNIOR_HIGH_SUBJECTS} values={data.subjects.junior_high} />
            <SubjectSection title="高校生" subjects={HIGH_SCHOOL_SUBJECTS} values={data.subjects.high_school} />
          </div>
        )}

        {/* スキル */}
        {hasSkills && (
          <div>
            <p className="text-sm font-bold text-gray-700 border-b border-gray-200 pb-1 mb-2">スキル・ツール</p>
            <SkillSection title="デザイン系" skills={DESIGN_TOOLS} values={data.skills.design} />
            <SkillSection title="SNS・マーケティング" skills={SNS_MARKETING} values={data.skills.sns_marketing} />
            <SkillSection title="基本PCスキル" skills={PC_BASICS} values={data.skills.pc_basics} />
            <SkillSection title="英語・英語教育" skills={ENGLISH_SKILLS} values={data.skills.english} />
            <SkillSection title="AIツール" skills={AI_TOOLS} values={data.skills.ai_tools} />
            <SkillSection title="会計・経理" skills={ACCOUNTING_SKILLS} values={data.skills.accounting} />
          </div>
        )}

        {/* キッズクラス */}
        {data.kidsInterests.length > 0 && (
          <div>
            <p className="text-sm font-bold text-gray-700 border-b border-gray-200 pb-1 mb-2">キッズクラスへの興味</p>
            <div className="flex flex-wrap gap-1.5">
              {data.kidsInterests.map(c => (
                <span key={c} className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">{c}</span>
              ))}
            </div>
          </div>
        )}

        {/* 貢献 */}
        {data.contributions.length > 0 && (
          <div>
            <p className="text-sm font-bold text-gray-700 border-b border-gray-200 pb-1 mb-2">手伝えること・やりたいこと</p>
            <div className="flex flex-wrap gap-1.5">
              {data.contributions.map(c => (
                <span key={c} className="bg-orange-100 text-orange-700 text-xs px-2.5 py-1 rounded-full font-medium">{c}</span>
              ))}
            </div>
          </div>
        )}

        {/* フリーテキスト */}
        {data.careerGoals && (
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-1">将来のキャリア・進路</p>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{data.careerGoals}</p>
          </div>
        )}
        {data.proposals && (
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-1">塾で実現したいこと・提案</p>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{data.proposals}</p>
          </div>
        )}
        {data.otherComments && (
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-1">その他</p>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{data.otherComments}</p>
          </div>
        )}
      </div>

      {submitError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {submitError}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 py-4 border-2 border-gray-300 text-gray-600 font-bold rounded-2xl text-base active:scale-95 transition-transform disabled:opacity-50"
        >
          ← 戻る
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-[2] py-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold rounded-2xl text-base shadow-md active:scale-95 transition-transform disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              送信中...
            </span>
          ) : '送信する ✓'}
        </button>
      </div>
    </div>
  )
}
