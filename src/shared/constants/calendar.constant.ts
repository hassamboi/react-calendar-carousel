import dayjs from 'dayjs'
import { ClosedDate, ClosedHoursRange, Formats, CardBreakpoint, PanelsToShow } from '../types'

/**
 * @constant
 * The default date format used for formatting dates.
 * @default
 */
export const DATE_FORMAT: string = 'DD MMMM YYYY'

/**
 * @constant
 * The default time format used for formatting times.
 * @default
 */
export const TIME_FORMAT: string = 'hh:mm a'

/**
 * @constant
 * The default clock format (12-hour or 24-hour).
 * @default
 */
export const CLOCK_FORMAT: '12h' | '24h' = '12h'

/**
 * @constant
 * The default date range (1 week).
 * @default
 */
export const DATE_RANGE = { start: dayjs(), end: dayjs().add(6, 'day') }

/**
 * @constant
 * The default date, time and clock formats.
 * @default
 */
export const FORMATS: Formats = {
  date: DATE_FORMAT,
  time: TIME_FORMAT,
  clock: CLOCK_FORMAT,
}

/**
 * @constant
 * The default breakpoint/cards-per-screen for the card carousel component.
 * @default
 */
export const CARD_BREAKPOINT: CardBreakpoint = {
  xs: 1,
  sm: 3,
  md: 5,
  lg: 6,
  xl: 8,
  xxl: 10,
}

/**
 * @constant
 * The default callback for closed date
 * @default
 */
export const CLOSED_DATE: ClosedDate = () => {
  return false
}

/**
 * @constant
 * The default range of closed hours in 24h format.
 * @default
 */
export const CLOSED_HOURS: ClosedHoursRange = { start: -1, end: -1 }

/**
 * @constant
 * The default panels to show.
 * @default
 */
export const PANELS_TO_SHOW: PanelsToShow = { date: true, time: true, duration: true }
