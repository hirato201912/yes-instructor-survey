'use client'

import Image from 'next/image'

export default function CompleteScreen() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <Image
        src="/orange_right.jpg"
        alt="YESくま"
        width={120}
        height={120}
        className="object-contain mb-6"
      />

      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        ありがとうございました！
      </h2>

      <p className="text-gray-500 text-sm leading-relaxed mb-2">
        ご回答いただき、ありがとうございます。
      </p>
      <p className="text-gray-500 text-sm leading-relaxed mb-8">
        皆さんのスキルや想いを大切に、<br />
        塾づくりに活かしていきます！
      </p>

      <div className="bg-gradient-to-r from-blue-50 to-orange-50 border border-orange-100 rounded-2xl px-6 py-4 text-sm text-gray-600">
        <p className="font-semibold text-gray-700 mb-1">糸島学習塾 YES</p>
        <p>いつも一緒に頑張っていきましょう！</p>
      </div>
    </div>
  )
}
