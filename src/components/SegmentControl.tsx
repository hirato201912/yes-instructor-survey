'use client'

interface Option<T extends string> {
  value: T
  label: string
}

interface Props<T extends string> {
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
  colorScheme?: 'subject' | 'skill'
}

const SUBJECT_COLORS = {
  none: 'bg-gray-100 text-gray-500',
  possible: 'bg-blue-100 text-blue-700',
  confident: 'bg-blue-500 text-white',
}

const SKILL_COLORS: Record<string, string> = {
  none: 'bg-gray-100 text-gray-500',
  interested: 'bg-blue-100 text-blue-600',
  can_do: 'bg-orange-500 text-white',
}

export default function SegmentControl<T extends string>({
  options,
  value,
  onChange,
  colorScheme = 'subject',
}: Props<T>) {
  const colorMap = colorScheme === 'subject' ? SUBJECT_COLORS : SKILL_COLORS

  return (
    <div className="flex rounded-lg overflow-hidden border border-gray-200 w-full">
      {options.map((opt, i) => {
        const isSelected = opt.value === value
        const selectedClass = (colorMap as Record<string, string>)[opt.value] || 'bg-blue-500 text-white'
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex-1 py-2 px-1 text-xs font-medium transition-all duration-150 select-none
              ${i > 0 ? 'border-l border-gray-200' : ''}
              ${isSelected ? selectedClass : 'bg-white text-gray-400 hover:bg-gray-50'}`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
