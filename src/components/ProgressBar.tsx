'use client'

interface Props {
  currentStep: number
  totalSteps: number
}

const STEP_LABELS = ['基本情報・科目', 'スキル・ツール', '興味・キャリア', '確認']

export default function ProgressBar({ currentStep, totalSteps }: Props) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-2">
        {STEP_LABELS.map((label, i) => {
          const step = i + 1
          const isActive = step === currentStep
          const isCompleted = step < currentStep
          return (
            <div key={i} className="flex flex-col items-center flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1 transition-all
                  ${isCompleted ? 'bg-blue-500 text-white' : isActive ? 'bg-orange-400 text-white ring-2 ring-orange-200' : 'bg-gray-200 text-gray-400'}`}
              >
                {isCompleted ? '✓' : step}
              </div>
              <span className={`text-[10px] text-center leading-tight
                ${isActive ? 'text-orange-500 font-semibold' : isCompleted ? 'text-blue-500' : 'text-gray-400'}`}>
                {label}
              </span>
            </div>
          )
        })}
      </div>
      <div className="relative h-1.5 bg-gray-200 rounded-full mx-4">
        <div
          className="absolute h-full bg-gradient-to-r from-blue-500 to-orange-400 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
