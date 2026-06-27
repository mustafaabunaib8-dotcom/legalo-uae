'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import {
  Sparkles, PenLine, ArrowRight, ArrowLeft, Loader2, Send,
  Building2, Globe, Calendar, FileText, CheckCircle2, AlertCircle,
  Scale, Shield, Clock, Wallet, Brain, ChevronDown
} from 'lucide-react'

type Mode = 'ai' | 'manual'

interface AIAnalysis {
  serviceType: string
  jurisdiction: string
  complexity: 'Low' | 'Medium' | 'High'
  requirements: string[]
  steps: string[]
  timeline: string
  estimatedCost: string
  assessment: string
  recommendedAction: string
}

const SERVICES = [
  { id: 'corporate', icon: Building2, count: 42 },
  { id: 'litigation', icon: Scale, count: 38 },
  { id: 'realestate', icon: Building2, count: 28 },
  { id: 'ip', icon: Shield, count: 19 },
  { id: 'employment', icon: Scale, count: 24 },
  { id: 'family', icon: Building2, count: 15 },
  { id: 'criminal', icon: Shield, count: 12 },
  { id: 'immigration', icon: Globe, count: 21 },
  { id: 'banking', icon: Wallet, count: 17 },
  { id: 'tax', icon: Wallet, count: 14 },
  { id: 'maritime', icon: Scale, count: 8 },
  { id: 'energy', icon: Scale, count: 11 },
]

const EMIRATES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain']
const LANGUAGES = ['English', 'Arabic', 'Hindi', 'Urdu', 'French', 'Russian', 'Chinese']

export default function GetStartedPage() {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()

  const [mode, setMode] = useState<Mode>('ai')
  const [aiText, setAiText] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null)

  const [step, setStep] = useState(1)
  const [wizard, setWizard] = useState({
    category: '',
    emirate: '',
    languages: [] as string[],
    description: '',
    payment: 'escrow',
  })

  const handleAIAnalyze = async () => {
    if (!aiText.trim()) return
    setAnalyzing(true)
    await new Promise((r) => setTimeout(r, 2000))
    setAnalysis({
      serviceType: 'Corporate Structuring',
      jurisdiction: 'Dubai (DIFC)',
      complexity: 'Medium',
      requirements: ['Trade license review', 'Shareholder agreement', 'MOA drafting'],
      steps: [
        'Initial consultation with corporate lawyer',
        'Document review and due diligence',
        'Drafting of corporate documents',
        'Filing with relevant authority',
        'Final review and completion',
      ],
      timeline: '2–4 weeks',
      estimatedCost: 'AED 15,000 – 25,000',
      assessment: 'Your matter involves forming a new entity in a free zone. Medium complexity with standard documentation needs.',
      recommendedAction: 'Match with a DIFC-registered corporate firm',
    })
    setAnalyzing(false)
  }

  const handleSubmit = async () => {
    // Mock case creation
    const caseId = 'case_' + Math.random().toString(36).slice(2, 10)
    router.push(`/${locale}/case/${caseId}/chat`)
  }

  const handleWizardNext = () => {
    if (step < 4) setStep(step + 1)
    else handleSubmit()
  }

  const handleWizardBack = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Mode Toggle */}
      <section className="border-b border-gray-100 bg-white sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-6 py-5">
          <div className="flex items-center justify-center gap-2">
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setMode('ai')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  mode === 'ai' ? 'bg-white shadow-sm text-emerald-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Brain className="h-4 w-4" />
                {t('intake.mode.ai')}
              </button>
              <button
                onClick={() => setMode('manual')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  mode === 'manual' ? 'bg-white shadow-sm text-emerald-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <PenLine className="h-4 w-4" />
                {t('intake.mode.manual')}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        {/* ─── AI MODE ─── */}
        {mode === 'ai' && !analysis && (
          <div>
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 mb-5">
                <Sparkles className="h-8 w-8 text-emerald-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t('intake.ai.title')}</h1>
              <p className="text-lg text-gray-500">{t('intake.ai.subtitle')}</p>
            </div>

            <Card className="border border-gray-100 rounded-2xl">
              <CardContent className="p-6">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  {t('intake.ai.label')}
                </Label>
                <Textarea
                  placeholder={t('intake.ai.placeholder')}
                  value={aiText}
                  onChange={(e) => setAiText(e.target.value)}
                  className="min-h-[200px] resize-none rounded-xl border-gray-200 focus:border-emerald-300 focus:ring-emerald-100 text-base leading-relaxed"
                />
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-400">{aiText.length} / 2000</span>
                  <Button
                    onClick={handleAIAnalyze}
                    disabled={!aiText.trim() || analyzing}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-11 px-6"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('intake.ai.analyzing')}
                      </>
                    ) : (
                      <>
                        {t('intake.ai.analyze')}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {mode === 'ai' && analyzing && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 mb-6 animate-pulse">
              <Sparkles className="h-10 w-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('intake.ai.processing')}</h2>
            <p className="text-gray-500">{t('intake.ai.processingDesc')}</p>
            <div className="mt-8 max-w-md mx-auto space-y-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-4 bg-gray-100 rounded-lg animate-pulse" style={{ width: `${80 - i * 15}%` }} />
              ))}
            </div>
          </div>
        )}

        {mode === 'ai' && analysis && (
          <div>
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 mb-5">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t('intake.ai.complete.title')}</h1>
              <p className="text-lg text-gray-500">{t('intake.ai.complete.subtitle')}</p>
            </div>

            <Card className="border border-gray-100 rounded-2xl mb-6">
              <CardContent className="p-8">
                {/* Service Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1">
                    {analysis.serviceType}
                  </Badge>
                  <Badge variant="outline" className="text-gray-600">
                    {analysis.jurisdiction}
                  </Badge>
                  <Badge
                    className={`${
                      analysis.complexity === 'High'
                        ? 'bg-orange-50 text-orange-700 border-orange-200'
                        : analysis.complexity === 'Medium'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}
                  >
                    {analysis.complexity} {t('intake.ai.complexity')}
                  </Badge>
                </div>

                <p className="text-base text-gray-600 leading-relaxed mb-8">{analysis.assessment}</p>

                {/* Requirements */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                    {t('intake.ai.requirements')}
                  </h3>
                  <div className="space-y-2">
                    {analysis.requirements.map((req) => (
                      <div key={req} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        {req}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Steps */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                    {t('intake.ai.steps')}
                  </h3>
                  <div className="space-y-3">
                    {analysis.steps.map((s, i) => (
                      <div key={s} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <span className="text-sm text-gray-600">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cost & Timeline */}
                <div className="grid grid-cols-2 gap-4 padding-4 bg-gray-50 rounded-xl p-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      <Clock className="h-3.5 w-3.5" /> {t('intake.ai.timeline')}
                    </div>
                    <div className="text-base font-semibold text-gray-900">{analysis.timeline}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      <Wallet className="h-3.5 w-3.5" /> {t('intake.ai.cost')}
                    </div>
                    <div className="text-base font-semibold text-gray-900">{analysis.estimatedCost}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended */}
            <Card className="border border-emerald-200 bg-emerald-50/50 rounded-2xl mb-8">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-medium text-emerald-600 uppercase tracking-wide">
                    {t('intake.ai.recommended')}
                  </div>
                  <div className="text-base font-semibold text-gray-900">{analysis.recommendedAction}</div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl border-gray-200 text-gray-700"
                onClick={() => {
                  setAnalysis(null)
                  setAiText('')
                }}
              >
                {t('intake.ai.actions.another')}
              </Button>
              <Button
                className="flex-1 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={handleSubmit}
              >
                {t('intake.ai.actions.submit')}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ─── MANUAL MODE ─── */}
        {mode === 'manual' && (
          <div>
            {/* Progress */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">
                  {t('intake.manual.step')} {step} / 4
                </span>
                <span className="text-sm text-gray-400">
                  {step === 1
                    ? t('intake.manual.step1.title')
                    : step === 2
                    ? t('intake.manual.step2.title')
                    : step === 3
                    ? t('intake.manual.step3.title')
                    : t('intake.manual.step4.title')}
                </span>
              </div>
              <Progress value={step * 25} className="h-1.5" />
            </div>

            <Card className="border border-gray-100 rounded-2xl">
              <CardContent className="p-8">
                {/* Step 1: Category */}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('intake.manual.step1.title')}</h2>
                    <p className="text-gray-500 mb-8">{t('intake.manual.step1.desc')}</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {SERVICES.map((svc) => (
                        <button
                          key={svc.id}
                          onClick={() => setWizard({ ...wizard, category: svc.id })}
                          className={`flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all text-center ${
                            wizard.category === svc.id
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-100 hover:border-gray-200 bg-white'
                          }`}
                        >
                          <svc.icon
                            className={`h-6 w-6 ${wizard.category === svc.id ? 'text-emerald-600' : 'text-gray-400'}`}
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {t(`services.${svc.id}`)}
                          </span>
                          <span className="text-xs text-gray-400">{svc.count} {t('intake.manual.firms')}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Emirate + Languages */}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('intake.manual.step2.title')}</h2>
                    <p className="text-gray-500 mb-8">{t('intake.manual.step2.desc')}</p>

                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{t('intake.manual.step2.emirate')}</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {EMIRATES.map((e) => (
                            <button
                              key={e}
                              onClick={() => setWizard({ ...wizard, emirate: e })}
                              className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                                wizard.emirate === e
                                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                  : 'border-gray-100 text-gray-600 hover:border-gray-200'
                              }`}
                            >
                              {e}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-3 block">{t('intake.manual.step2.languages')}</Label>
                        <div className="flex flex-wrap gap-2">
                          {LANGUAGES.map((lang) => (
                            <button
                              key={lang}
                              onClick={() =>
                                setWizard({
                                  ...wizard,
                                  languages: wizard.languages.includes(lang)
                                    ? wizard.languages.filter((l) => l !== lang)
                                    : [...wizard.languages, lang],
                                })
                              }
                              className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                                wizard.languages.includes(lang)
                                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
                              }`}
                            >
                              {lang}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Description + Docs */}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('intake.manual.step3.title')}</h2>
                    <p className="text-gray-500 mb-8">{t('intake.manual.step3.desc')}</p>

                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          {t('intake.manual.step3.description')}
                        </Label>
                        <Textarea
                          placeholder={t('intake.manual.step3.placeholder')}
                          value={wizard.description}
                          onChange={(e) => setWizard({ ...wizard, description: e.target.value })}
                          className="min-h-[160px] resize-none rounded-xl border-gray-200 focus:border-emerald-300"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                          {t('intake.manual.step3.documents')}
                        </Label>
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-emerald-300 transition-colors cursor-pointer">
                          <FileText className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                          <p className="text-sm text-gray-500">{t('intake.manual.step3.upload')}</p>
                          <p className="text-xs text-gray-400 mt-1">{t('intake.manual.step3.uploadHint')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Payment */}
                {step === 4 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('intake.manual.step4.title')}</h2>
                    <p className="text-gray-500 mb-8">{t('intake.manual.step4.desc')}</p>

                    <div className="space-y-4">
                      {[
                        { id: 'escrow', label: t('intake.manual.step4.escrow'), desc: t('intake.manual.step4.escrowDesc') },
                        { id: 'direct', label: t('intake.manual.step4.direct'), desc: t('intake.manual.step4.directDesc') },
                        { id: 'subscription', label: t('intake.manual.step4.subscription'), desc: t('intake.manual.step4.subscriptionDesc') },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setWizard({ ...wizard, payment: opt.id })}
                          className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                            wizard.payment === opt.id
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-100 hover:border-gray-200'
                          }`}
                        >
                          <div className="text-base font-semibold text-gray-900">{opt.label}</div>
                          <div className="text-sm text-gray-500 mt-1">{opt.desc}</div>
                        </button>
                      ))}
                    </div>

                    {wizard.payment === 'escrow' && (
                      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                        <Shield className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-amber-800">
                          {t('intake.manual.step4.escrowNotice')}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
                  {step > 1 ? (
                    <Button variant="ghost" onClick={handleWizardBack} className="text-gray-500">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      {t('intake.manual.back')}
                    </Button>
                  ) : (
                    <div />
                  )}
                  <Button
                    onClick={handleWizardNext}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-11 px-6"
                    disabled={
                      (step === 1 && !wizard.category) ||
                      (step === 2 && !wizard.emirate)
                    }
                  >
                    {step === 4 ? t('intake.manual.submit') : t('intake.manual.next')}
                    {step < 4 && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
