import { useState } from 'react'
import { meses } from '../lib/date'

type Event = { date: string }

type Props = {
  events: Event[]
}

export default function Calendar({ events }: Props) {
  const [current, setCurrent] = useState(() => new Date())

  const month = current.getMonth()
  const year = current.getFullYear()

  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

  const monthEvents = events.filter((e) => {
    const d = new Date(e.date)
    return d.getFullYear() === year && d.getMonth() === month
  })
  const eventDays = new Set(
    monthEvents.map((e) => new Date(e.date).getDate())
  )

  const prevMonth = () => setCurrent(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrent(new Date(year, month + 1, 1))

  return (
    <div className="bg-white p-4 rounded-xl shadow w-full max-w-md">
      <div className="flex justify-between items-center mb-2">
        <button onClick={prevMonth} className="px-2">‹</button>
        <span className="font-medium">
          {meses[month].label} {year}
        </span>
        <button onClick={nextMonth} className="px-2">›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'].map((d) => (
          <div key={d} className="font-medium">
            {d}
          </div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={'b'+i}></div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const hasEvent = eventDays.has(day)
          return (
            <div
              key={day}
              className={
                'py-1 rounded ' + (hasEvent ? 'bg-blue-200 font-semibold' : '')
              }
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}
