'use client'

import { SurveyData, SUBJECT_LEVELS, ELEMENTARY_SUBJECTS, JUNIOR_HIGH_SUBJECTS, HIGH_SCHOOL_SUBJECTS, SubjectLevel } from '@/types/survey'
import SegmentControl from './SegmentControl'
import Accordion from './Accordion'

interface Props {
  data: SurveyData
  onChange: (data: Partial<SurveyData>) => void
  onNext: () => void
  error: string
}

export default function Step1({ data, onChange, onNext, error }: Props) {
  const updateSubject = (
    level: 'elementary' | 'junior_high' | 'high_school',
    subject: string,
    value: SubjectLevel
  ) => {
    onChange({
      subjects: {
        ...data.subjects,
        [level]: {
          ...data.subjects[level],
          [subject]: value,
        },
      },
    })
  }

  const renderSubjects = (
    level: 'elementary' | 'junior_high' | 'high_school',
    subjects: string[]
  ) => (
    <div className="space-y-3">
      {subjects.map(subject => (
        <div key={subject}>
          <div className="text-sm text-gray-600 mb-1">{subject}</div>
          <SegmentControl
            options={SUBJECT_LEVELS}
            value={data.subjects[level][subject] ?? 'none'}
            onChange={(val) => updateSubject(level, subject, val)}
            colorScheme="subject"
          />
        </div>
      ))}
    </div>
  )

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-4">基本情報・指導可能科目</h2>

      {/* 名前 */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          お名前 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={data.instructorName}
          onChange={(e) => onChange({ instructorName: e.target.value })}
          placeholder="例：山田 太郎"
          className={`w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition
            ${error ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

      {/* 科目 */}
      <div className="mb-2">
        <p className="text-sm font-semibold text-gray-700 mb-1">指導可能科目</p>
        <p className="text-xs text-gray-400 mb-3">各科目の指導レベルを選択してください（デフォルト：指導不可）</p>
      </div>

      <Accordion title="🏫 小学生" defaultOpen={true}>
        {renderSubjects('elementary', ELEMENTARY_SUBJECTS)}
      </Accordion>

      <Accordion title="📚 中学生">
        {renderSubjects('junior_high', JUNIOR_HIGH_SUBJECTS)}
      </Accordion>

      <Accordion title="🎓 高校生">
        {renderSubjects('high_school', HIGH_SCHOOL_SUBJECTS)}
      </Accordion>

      <button
        type="button"
        onClick={onNext}
        className="w-full mt-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-2xl text-base shadow-md active:scale-95 transition-transform"
      >
        次へ →
      </button>
    </div>
  )
}
