'use client'

import { SurveyData, CONTRIBUTION_OPTIONS, KIDS_CLASS_OPTIONS } from '@/types/survey'

interface Props {
  data: SurveyData
  onChange: (data: Partial<SurveyData>) => void
  onNext: () => void
  onBack: () => void
}

export default function Step3({ data, onChange, onNext, onBack }: Props) {
  const toggleContribution = (option: string) => {
    const updated = data.contributions.includes(option)
      ? data.contributions.filter(c => c !== option)
      : [...data.contributions, option]
    onChange({ contributions: updated })
  }

  const toggleKids = (option: string) => {
    const updated = data.kidsInterests.includes(option)
      ? data.kidsInterests.filter(c => c !== option)
      : [...data.kidsInterests, option]
    onChange({ kidsInterests: updated })
  }

  const CheckButton = ({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) => (
    <button
      type="button"
      onClick={onToggle}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all active:scale-95
        ${checked
          ? 'border-orange-400 bg-orange-50 text-orange-700'
          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}
    >
      <span className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all
        ${checked ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-400'}`}>
        {checked ? '✓' : ''}
      </span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  )

  return (
    <div>
      <h2 className="text-lg font-bold text-gray-800 mb-4">興味・キャリア・塾への貢献</h2>

      {/* キッズクラス */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          キッズクラスへの興味・関心
          <span className="text-gray-400 font-normal ml-1">（複数選択可）</span>
        </label>
        <p className="text-xs text-gray-400 mb-2">
          小学校低学年向けプログラムで、興味があるものを選んでください
        </p>
        <div className="space-y-2">
          {KIDS_CLASS_OPTIONS.map(option => (
            <CheckButton
              key={option}
              label={option}
              checked={data.kidsInterests.includes(option)}
              onToggle={() => toggleKids(option)}
            />
          ))}
        </div>
      </div>

      {/* 塾の運営で手伝えること */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          塾の運営で手伝えること / やってみたいこと
          <span className="text-gray-400 font-normal ml-1">（複数選択可）</span>
        </label>
        <div className="space-y-2">
          {CONTRIBUTION_OPTIONS.map(option => (
            <CheckButton
              key={option}
              label={option}
              checked={data.contributions.includes(option)}
              onToggle={() => toggleContribution(option)}
            />
          ))}
        </div>
      </div>

      {/* 将来のキャリア */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          将来目指しているキャリア・進路
          <span className="text-gray-400 font-normal ml-1">（任意）</span>
        </label>
        <textarea
          value={data.careerGoals}
          onChange={(e) => onChange({ careerGoals: e.target.value })}
          placeholder="例：教師を目指しています。英語の教育に携わりたいです。"
          rows={3}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition"
        />
      </div>

      {/* 塾で実現したいこと */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          塾で実現したいこと・提案
          <span className="text-gray-400 font-normal ml-1">（任意）</span>
        </label>
        <textarea
          value={data.proposals}
          onChange={(e) => onChange({ proposals: e.target.value })}
          placeholder="例：英語クラスを一緒に立ち上げたい、SNSで生徒募集のお手伝いをしたい など"
          rows={3}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition"
        />
      </div>

      {/* その他 */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          その他、伝えたいこと
          <span className="text-gray-400 font-normal ml-1">（任意）</span>
        </label>
        <textarea
          value={data.otherComments}
          onChange={(e) => onChange({ otherComments: e.target.value })}
          placeholder="何でもお気軽にどうぞ！"
          rows={3}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition"
        />
      </div>

      <div className="flex gap-3">
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
          確認する →
        </button>
      </div>
    </div>
  )
}
