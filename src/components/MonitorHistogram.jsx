import React from 'react'
import config from '../../config.yaml'
import MonitorDayAverage from './MonitorDayAverage'

export default function MonitorHistogram({ monitorId, kvMonitor }) {
  // create date and set date - daysInHistogram for the first day of the histogram
  let date = new Date()
  date.setDate(date.getDate() - config.settings.daysInHistogram)

  const content = Array.from(Array(config.settings.daysInHistogram).keys()).map(
    (key) => {
      date.setDate(date.getDate() + 1)
      const dayInHistogram = date.toISOString().split('T')[0]

      let bgClass = 'bg-gray-200 dark:bg-gray-700'
      let dayInHistogramLabel = config.settings.dayInHistogramNoData

      // filter all dates before first check, then check the rest
      if (kvMonitor && kvMonitor.firstCheck <= dayInHistogram) {
        if (
          kvMonitor.checks.hasOwnProperty(dayInHistogram) &&
          kvMonitor.checks[dayInHistogram].fails > 0
        ) {
          bgClass = 'bg-yellow-300 dark:bg-yellow-600'
          dayInHistogramLabel = `${kvMonitor.checks[dayInHistogram].fails} ${config.settings.dayInHistogramNotOperational}`
        } else {
          bgClass = 'bg-green-300 dark:bg-green-600'
          dayInHistogramLabel = config.settings.dayInHistogramOperational
        }
      }

      return (
        <div key={key} className="relative group">
          <div className={`w-3 h-8 rounded-sm ${bgClass} cursor-pointer`} />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap shadow-lg border border-gray-700 min-w-max">
            <div className="text-center">
              {dayInHistogram}
              <br />
              <span className="font-semibold">
                {dayInHistogramLabel}
              </span>
              {kvMonitor &&
                kvMonitor.checks.hasOwnProperty(dayInHistogram) &&
                Object.keys(kvMonitor.checks[dayInHistogram].res).map((key) => {
                  return (
                    <MonitorDayAverage
                      key={key}
                      location={key}
                      avg={kvMonitor.checks[dayInHistogram].res[key].a}
                    />
                  )
                })}
            </div>
            {/* 添加小箭头 */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )
    },
  )

  return (
    <div
      key={`${monitorId}-histogram`}
      className="flex flex-wrap items-center gap-1 mt-4 max-w-full"
    >
      {content}
    </div>
  )
}