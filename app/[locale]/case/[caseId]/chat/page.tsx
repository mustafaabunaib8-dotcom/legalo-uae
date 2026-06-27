'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Send, Paperclip, MoreVertical, Star, Shield, MapPin, Phone,
  Mail, Clock, Globe, ChevronRight, CheckCheck, Loader2,
  Sparkles, FileText, Image, AlertTriangle
} from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'firm' | 'system'
  timestamp: Date
  status?: 'sending' | 'sent' | 'read'
}

interface Firm {
  id: string
  name: string
  logo?: string
  rating: number
  specialty: string
  location: string
  responseTime: string
  matchScore: number
  status: 'online' | 'reviewing' | 'offline'
}

export default function MatchChatPage() {
  const t = useTranslations('chat')
  const locale = useLocale()
  const { caseId } = useParams()

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: t('chat.welcome'),
      sender: 'system',
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: '2',
      content: 'Hello! I\'ve reviewed your case details. I specialize in corporate structuring in the UAE and would be happy to assist you. Could you tell me more about the specific entity you\'re looking to set up?',
      sender: 'firm',
      timestamp: new Date(Date.now() - 240000),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const firms: Firm[] = [
    {
      id: '1',
      name: 'Al Tamimi & Co',
      rating: 4.9,
      specialty: 'Corporate Law',
      location: 'Dubai, DIFC',
      responseTime: '< 1h',
      matchScore: 95,
      status: 'online',
    },
    {
      id: '2',
      name: 'Clyde & Co',
      rating: 4.8,
      specialty: 'Commercial Litigation',
      location: 'Dubai, DIFC',
      responseTime: '< 2h',
      matchScore: 88,
      status: 'reviewing',
    },
    {
      id: '3',
      name: 'Baker McKenzie',
      rating: 4.7,
      specialty: 'M&A Advisory',
      location: 'Abu Dhabi',
      responseTime: '< 4h',
      matchScore: 82,
      status: 'online',
    },
  ]

  const selectedFirm = firms[0]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending',
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue('')

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    // Simulate send confirmation
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((m) => (m.id === newMessage.id ? { ...m, status: 'sent' } : m))
      )
    }, 500)

    // Simulate typing indicator
    setTimeout(() => {
      setIsTyping(true)
    }, 1000)

    // Simulate firm response
    setTimeout(() => {
      setIsTyping(false)
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Thank you for the details. Based on what you\'ve described, I recommend we schedule a consultation to discuss the optimal structure for your business. Our team has extensive experience with DIFC and ADGM setups. Would you prefer to discuss this over a call or in person?',
        sender: 'firm',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, response])
    }, 3000)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="h-[calc(100vh-64px)] flex bg-gray-50">
      {/* Left Sidebar - Match Sidebar */}
      <aside className="hidden lg:flex w-80 flex-col border-r border-gray-100 bg-white">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">{t('chat.matches.title')}</h2>
          <p className="text-sm text-gray-500 mt-1">{t('chat.matches.subtitle')}</p>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {firms.map((firm, idx) => (
              <Card
                key={firm.id}
                className={`cursor-pointer transition-all ${
                  idx === 0
                    ? 'border-emerald-200 bg-emerald-50/50 shadow-sm'
                    : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm font-semibold">
                        {firm.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900 truncate">{firm.name}</span>
                        {firm.status === 'online' && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                        )}
                        {firm.status === 'reviewing' && (
                          <Loader2 className="h-3 w-3 text-amber-500 animate-spin flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-medium text-gray-700">{firm.rating}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{firm.specialty}</span>
                      </div>
                    </div>
                    {/* Match score ring */}
                    <div className="relative flex-shrink-0">
                      <svg className="w-10 h-10" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={idx === 0 ? '#059669' : '#9CA3AF'}
                          strokeWidth="3"
                          strokeDasharray={`${firm.matchScore}, 100`}
                          strokeLinecap="round"
                        />
                        <text
                          x="18"
                          y="21"
                          textAnchor="middle"
                          className="text-[9px] font-bold"
                          fill={idx === 0 ? '#059669' : '#6B7280'}
                        >
                          {firm.matchScore}%
                        </text>
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </aside>

      {/* Center - Chat Thread */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-emerald-100 text-emerald-700 font-semibold">
                {selectedFirm.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-semibold text-gray-900">{selectedFirm.name}</h1>
                <Shield className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{t('chat.header.online')}</span>
                <span className="text-gray-300">•</span>
                <span>{t('chat.header.responseTime', { time: selectedFirm.responseTime })}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-gray-600">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-gray-600">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Escrow Banner */}
        <div className="px-6 py-2.5 bg-amber-50 border-b border-amber-100 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0" />
          <span className="text-sm text-amber-800">{t('chat.escrow.banner')}</span>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1">
          <div className="px-6 py-6 space-y-4">
            {messages.map((msg, idx) => {
              const showTimestamp = idx === 0 || messages[idx - 1]?.sender !== msg.sender
              return (
                <div key={msg.id}>
                  {showTimestamp && (
                    <div className="text-center my-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-500">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  )}
                  <div
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : msg.sender === 'system' ? 'justify-center' : 'justify-start'}`}
                  >
                    {msg.sender === 'system' ? (
                      <div className="px-4 py-2 rounded-xl bg-gray-100 text-sm text-gray-600 max-w-md text-center">
                        <Sparkles className="h-4 w-4 text-emerald-500 inline mr-1" />
                        {msg.content}
                      </div>
                    ) : (
                      <div className={`flex items-end gap-2 max-w-[75%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                        {msg.sender === 'firm' && (
                          <Avatar className="h-7 w-7 flex-shrink-0">
                            <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                              {selectedFirm.name[0]}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-emerald-600 text-white rounded-br-md'
                              : 'bg-gray-100 text-gray-900 rounded-bl-md'
                          }`}
                        >
                          <p>{msg.content}</p>
                          {msg.sender === 'user' && msg.status && (
                            <div className="flex justify-end mt-1">
                              {msg.status === 'sending' ? (
                                <Loader2 className="h-3 w-3 text-emerald-200 animate-spin" />
                              ) : msg.status === 'sent' ? (
                                <CheckCheck className="h-3 w-3 text-emerald-200" />
                              ) : (
                                <CheckCheck className="h-3 w-3 text-emerald-300" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                    {selectedFirm.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="px-4 py-3 rounded-2xl bg-gray-100 rounded-bl-md flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Quick replies */}
        <div className="px-6 pb-2">
          <div className="flex gap-2 overflow-x-auto">
            {[t('chat.quick.yes'), t('chat.quick.call'), t('chat.quick.reviews')].map((reply) => (
              <button
                key={reply}
                onClick={() => setInputValue(reply)}
                className="flex-shrink-0 px-4 py-2 rounded-full border border-emerald-200 text-sm text-emerald-700 hover:bg-emerald-50 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="px-6 pb-6 pt-2 bg-white border-t border-gray-100">
          <div className="flex items-end gap-3">
            <div className="flex-shrink-0 flex gap-1">
              <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-gray-600">
                <Paperclip className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  // Auto-resize
                  e.target.style.height = 'auto'
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
                }}
                onKeyDown={handleKeyDown}
                placeholder={t('chat.input.placeholder')}
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-300 max-h-[120px]"
                rows={1}
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              size="icon"
              className="h-10 w-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex-shrink-0 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>

      {/* Right Panel - Firm Info */}
      <aside className="hidden xl:flex w-80 flex-col border-l border-gray-100 bg-white">
        <div className="p-6">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
            {t('chat.info.title')}
          </h3>
          <div className="text-center mb-6">
            <Avatar className="h-20 w-20 mx-auto mb-3">
              <AvatarFallback className="bg-emerald-100 text-emerald-700 text-2xl font-bold">
                {selectedFirm.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <h4 className="text-lg font-semibold text-gray-900">{selectedFirm.name}</h4>
            <div className="flex items-center justify-center gap-1 mt-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-gray-900">{selectedFirm.rating}</span>
              <span className="text-sm text-gray-400">(324 {t('chat.info.reviews')})</span>
            </div>
            <Badge className="mt-2 bg-emerald-50 text-emerald-700 border-emerald-200">
              <Shield className="h-3 w-3 mr-1" />
              {t('chat.info.verified')}
            </Badge>
          </div>

          <Separator className="my-4" />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                <Globe className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <div className="text-xs text-gray-500">{t('chat.info.location')}</div>
                <div className="text-sm font-medium text-gray-900">{selectedFirm.location}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                <Clock className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <div className="text-xs text-gray-500">{t('chat.info.responseTime')}</div>
                <div className="text-sm font-medium text-gray-900">{selectedFirm.responseTime}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                <Mail className="h-4 w-4 text-gray-500" />
              </div>
              <div>
                <div className="text-xs text-gray-500">{t('chat.info.email')}</div>
                <div className="text-sm font-medium text-gray-900">contact@altamimi.ae</div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h5 className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-3">
              {t('chat.info.specialties')}
            </h5>
            <div className="flex flex-wrap gap-2">
              {['Corporate Law', 'M&A', 'DIFC', 'Real Estate'].map((spec) => (
                <Badge key={spec} variant="secondary" className="text-xs font-normal">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-11">
            {t('chat.info.bookConsultation')}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </aside>
    </div>
  )
}
