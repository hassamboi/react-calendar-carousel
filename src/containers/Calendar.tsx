import { Collapse, TimePicker, Typography, ConfigProvider, theme, CollapseProps } from 'antd'
import DurationSetter from '../components/DurationSetter'
import { useCalendar, useCustomStyles } from '../hooks'
import CardCarousel from '../components/CardCarousel/CardCarousel'
import { Dayjs } from 'dayjs'
import { useState } from 'react'
import {
  getDateToken,
  getDurationToken,
  getTimeToken,
  getFormattedTime,
  getFormattedDate,
  getDurationInHours,
  getDisabledTime,
} from '../utils'
import { DownOutlined } from '@ant-design/icons'
import { PanelsToShow } from '../shared/types'
import { PANELS_TO_SHOW } from '../shared/constants'

const { Text } = Typography
const { useToken } = theme

export type CalendarProps = {
  panelsToShow?: PanelsToShow
  openedPanels?: string | Array<string>
  dateComponent?: React.ReactNode
  timeComponent?: React.ReactNode
  durationComponent?: React.ReactNode
}

export default function Calendar({
  panelsToShow,
  openedPanels,
  dateComponent,
  timeComponent,
  durationComponent,
}: CalendarProps) {
  const { token } = useToken()
  const styles = useCustomStyles()

  const {
    selected,
    dates,
    formats,
    durationStep,
    closedHours,
    setDate,
    setTime,
    increaseDuration,
    decreaseDuration,
  } = useCalendar()

  const [activeKey, setActiveKey] = useState<string | Array<string>>(
    openedPanels || ['1', '2']
  )

  const handleDateChange = (date: Dayjs) => {
    setDate(date)
    setActiveKey(['2'])
  }

  const handleTimeChange = (time: Dayjs | null) => {
    /* istanbul ignore next -- @preserve */
    if (time) setTime(time)
    /* istanbul ignore next -- @preserve */
    setActiveKey([])
  }

  const collapseItems: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Date',
      extra: (
        <Text style={{ fontSize: token.fontSizeLG }}>
          {getFormattedDate(selected?.date, formats.date)}
        </Text>
      ),
      children: dateComponent || (
        <ConfigProvider
          theme={{
            token: getDateToken(token, styles),
          }}
        >
          <CardCarousel dates={dates} onClick={handleDateChange} />
        </ConfigProvider>
      ),
    },

    {
      key: '2',
      label: 'Time',
      extra: (
        <Text style={{ fontSize: token.fontSizeLG }}>
          {getFormattedTime(selected?.time, formats.time)}
        </Text>
      ),
      children: timeComponent || (
        <ConfigProvider
          theme={{
            token: getTimeToken(token, styles),
          }}
        >
          <TimePicker
            onChange={handleTimeChange}
            size="large"
            use12Hours={formats.clock === '12h'}
            format={formats.time}
            style={{ minWidth: '100%' }}
            disabledTime={() => getDisabledTime(closedHours)}
            hideDisabledOptions
            showNow={false}
          />
        </ConfigProvider>
      ),
    },

    {
      key: '3',
      label: 'Duration',
      showArrow: false,
      collapsible: 'icon',
      extra: durationComponent || (
        <ConfigProvider
          theme={{
            token: getDurationToken(token, styles),
          }}
        >
          <DurationSetter
            onClickIncrease={() => increaseDuration(durationStep)}
            onClickDecrease={() => decreaseDuration(durationStep)}
            value={getDurationInHours(selected.duration)}
          />
        </ConfigProvider>
      ),
    },
  ]

  const panelFilter = { ...PANELS_TO_SHOW, ...panelsToShow }

  const filteredPanels = collapseItems.filter((item) => {
    if (!panelFilter.date && item.key === '1') return false
    if (!panelFilter.time && item.key === '2') return false
    if (!panelFilter.duration && item.key === '3') return false
    return true
  })

  return (
    <Collapse
      ghost
      expandIconPosition="end"
      expandIcon={() => <DownOutlined style={{ color: token.colorPrimary }} />}
      activeKey={activeKey}
      onChange={(key) => setActiveKey(key)}
      style={{
        backgroundColor: token.colorBgContainer,
        maxWidth: styles?.carouselWidth,
        fontSize: token.fontSizeLG,
      }}
      items={filteredPanels}
    />
  )
}
