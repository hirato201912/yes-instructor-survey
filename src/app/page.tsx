'use client'

import Image from 'next/image'
import { useState } from 'react'
import { SurveyData, createDefaultSubjects, createDefaultSkills } from '@/types/survey'
import { supabase } from '@/lib/supabase'
import ProgressBar from '@/components/ProgressBar'
import Step1 from '@/components/Step1'
import Step2 from '@/components/Step2'
import Step3 from '@/components/Step3'
import ConfirmStep from '@/components/ConfirmStep'
import CompleteScreen from '@/components/CompleteScreen'

const TOTAL_STEPS = 4

function createInitialData(): SurveyData {
  return {
    instructorName: '',
    subjects: createDefaultSubjects(),
    skills: createDefaultSkills(),
    contributions: [],
    kidsInterests: [],
    careerGoals: '',
    proposals: '',
    otherComments: '',
  }
}

export default function Home() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<SurveyData>(createInitialData)
  const [completed, setCompleted] = useState(false)
  const [nameError, setNameError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const update = (partial: Partial<SurveyData>) => {
    setData(prev => ({ ...prev, ...partial }))
  }

  const goNext = () => {
    if (step === 1) {
      if (!data.instructorName.trim()) {
        setNameError('お名前を入力してください')
        return
      }
      setNameError('')
    }
    setStep(s => Math.min(s + 1, TOTAL_STEPS))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    setStep(s => Math.max(s - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const { error } = await supabase.from('survey_responses').insert({
        instructor_name: data.instructorName.trim(),
        subjects: data.subjects,
        skills: data.skills,
        contributions: data.contributions,
        kids_interests: data.kidsInterests,
        career_goals: data.careerGoals,
        proposals: data.proposals,
        other_comments: data.otherComments,
      })

      if (error) throw error

      setCompleted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error(err)
      setSubmitError('送信に失敗しました。時間をおいて再度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (completed) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6">
          <CompleteScreen />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 px-4 py-8">
      <div className="w-full max-w-md mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-6">
          <div className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
            糸島学習塾 YES
          </div>
          <div className="flex items-center justify-center gap-2 mb-1">
            <Image
              src="/orange_right.jpg"
              alt="YESくま"
              width={40}
              height={40}
              className="object-contain"
            />
            <h1 className="text-xl font-bold text-gray-800">講師スキル調査</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">回答は数分で完了します</p>
        </div>

        {/* カード */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />

          <div className="transition-all duration-300">
            {step === 1 && (
              <Step1
                data={data}
                onChange={update}
                onNext={goNext}
                error={nameError}
              />
            )}
            {step === 2 && (
              <Step2
                data={data}
                onChange={update}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            {step === 3 && (
              <Step3
                data={data}
                onChange={update}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            {step === 4 && (
              <ConfirmStep
                data={data}
                onBack={goBack}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitError={submitError}
              />
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-300 mt-4">
          © 2025 糸島学習塾 YES
        </p>
      </div>
    </main>
  )
}
