'use client'

export type HitGrade = 'perfect' | 'great' | 'good' | 'miss'

interface HitFeedbackItem {
  id: number
  grade: HitGrade
  lane: number
  color: string
}

interface HitFeedbackProps {
  feedbacks: HitFeedbackItem[]
}

const GRADE_CONFIG: Record<HitGrade, { text: string; color: string; size: string }> = {
  perfect: { text: 'PERFECT', color: '#FFD700', size: 'text-lg' },
  great:   { text: 'GREAT',   color: '#4ECDC4', size: 'text-base' },
  good:    { text: 'GOOD',    color: '#A78BFA', size: 'text-sm' },
  miss:    { text: 'MISS',    color: '#FF4444', size: 'text-sm' },
}

export function HitFeedback({ feedbacks }: HitFeedbackProps) {
  return (
    <>
      {feedbacks.map(fb => {
        const cfg = GRADE_CONFIG[fb.grade]
        return (
          <div
            key={fb.id}
            className="absolute z-40 pointer-events-none gh-hit-feedback"
            style={{
              bottom: '80px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <span
              className={`${cfg.size} font-black tracking-wider`}
              style={{
                color: cfg.color,
                textShadow: `0 0 20px ${cfg.color}80, 0 0 40px ${cfg.color}40`,
              }}
            >
              {cfg.text}
            </span>
          </div>
        )
      })}
    </>
  )
}

export type { HitFeedbackItem }
