export type SubjectLevel = 'none' | 'possible' | 'confident'
export type SkillLevel = 'none' | 'interested' | 'can_do'

export interface SubjectGroup {
  [subject: string]: SubjectLevel
}

export interface Subjects {
  elementary: SubjectGroup
  junior_high: SubjectGroup
  high_school: SubjectGroup
}

export interface SkillGroup {
  [skill: string]: SkillLevel
}

export interface Skills {
  pc_basics: SkillGroup
  ai_tools: SkillGroup
  design: SkillGroup
  sns_marketing: SkillGroup
  english: SkillGroup
  accounting: SkillGroup
}

export interface SurveyData {
  instructorName: string
  subjects: Subjects
  skills: Skills
  contributions: string[]
  kidsInterests: string[]
  careerGoals: string
  proposals: string
  otherComments: string
}

export const SUBJECT_LEVELS: { value: SubjectLevel; label: string }[] = [
  { value: 'none', label: '指導不可' },
  { value: 'possible', label: 'ある程度可能' },
  { value: 'confident', label: '自信あり' },
]

export const SKILL_LEVELS: { value: SkillLevel; label: string }[] = [
  { value: 'none', label: 'なし' },
  { value: 'interested', label: '興味あり' },
  { value: 'can_do', label: 'できる' },
]

export const ELEMENTARY_SUBJECTS = ['国語', '算数', '理科', '社会', '英語']
export const JUNIOR_HIGH_SUBJECTS = ['国語', '数学', '理科', '社会', '英語']
export const HIGH_SCHOOL_SUBJECTS = [
  '現代文', '古文・漢文', '数学IA', '数学IIB', '数学III',
  '英語', '物理', '化学', '生物', '日本史', '世界史', '地理', '情報',
]

export const PC_BASICS = [
  'Word / Google ドキュメント',
  'Excel / Google スプレッドシート',
  'PowerPoint / Google スライド',
]

export const AI_TOOLS = [
  'ChatGPT / Claude などの生成AI',
  '画像生成AI（Midjourney など）',
]

export const DESIGN_TOOLS = [
  'Canva',
  'Adobe 系ソフト（Illustrator・Photoshop など）',
]

export const SNS_MARKETING = [
  'Instagram / X 運用',
  'LINE公式アカウント運用',
  'ブログ・コンテンツ作成',
]

export const ENGLISH_SKILLS = [
  '英語教室・英会話の指導経験',
  'フォニックス（子ども英語）の指導',
  '英検2級以上',
  '英検準1級以上',
  'TOEIC 600点以上',
  '留学・海外在住経験あり',
]

export const ACCOUNTING_SKILLS = [
  'お金・会計の仕組みへの興味',
  '簿記・経理の学習経験（授業・独学含む）',
  'Excel / スプレッドシートでの集計・管理',
]

export const CONTRIBUTION_OPTIONS = [
  '教材・プリント作成',
  'SNS運用（Instagram、Xなど）',
  'ブログ・コンテンツ作成',
  'チラシ・ポスターのデザイン',
  '動画制作（授業動画、紹介動画など）',
  'イベント企画・運営',
  '事務作業の補助',
  '経理・会計業務の補助',
  '保護者対応の補助',
  'その他',
]

export const KIDS_CLASS_OPTIONS = [
  '英語クラス（将来的な開講・補助への関心）',
  'そろばん',
  '速読',
  'EQジム（ブロック・思考力）',
  '将棋',
  'プログラミング（Scratch など）',
  'マインクラフトを使ったプログラミング',
  'その他のキッズクラス',
]

export function createDefaultSubjects(): Subjects {
  const makeGroup = (subjects: string[]): SubjectGroup =>
    Object.fromEntries(subjects.map(s => [s, 'none']))

  return {
    elementary: makeGroup(ELEMENTARY_SUBJECTS),
    junior_high: makeGroup(JUNIOR_HIGH_SUBJECTS),
    high_school: makeGroup(HIGH_SCHOOL_SUBJECTS),
  }
}

export function createDefaultSkills(): Skills {
  const makeGroup = (skills: string[]): SkillGroup =>
    Object.fromEntries(skills.map(s => [s, 'none']))

  return {
    pc_basics: makeGroup(PC_BASICS),
    ai_tools: makeGroup(AI_TOOLS),
    design: makeGroup(DESIGN_TOOLS),
    sns_marketing: makeGroup(SNS_MARKETING),
    english: makeGroup(ENGLISH_SKILLS),
    accounting: makeGroup(ACCOUNTING_SKILLS),
  }
}
