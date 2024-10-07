import type dayjs from 'dayjs'
import { useStoreAuth, useDayjs } from '#imports'

type DatesEstimates = {
  date: string
  time: string
  datetime: string
}

type Options = {
  seconds: true
  separator: string
}

export const useDates = (val?: dayjs.Dayjs | string, _options?: Partial<Options>): DatesEstimates => {
  const options = {
    seconds: true,
    separator: ', ',
    ..._options,
  }
  const storeAuth = useStoreAuth()
  const settings = computed(() => storeAuth.settings)

  const twoDigits = (_value: string | number | undefined) => {
    switch (_value) {
      case undefined: {
        if (_value.toString().length <= 1) return '0' + _value.toString()
        return _value.toString()
      }
      default: return '00'
    }
  }

  const is12H = computed(() => settings.value.data.attributes.time_format ? (settings.value.data.attributes.time_format === '12h') : false)

  const dayjs = useDayjs()
  dayjs.locale(settings.value.data.attributes.locale)

  const _date = dayjs(val)

  let hours = _date.hour()
  if (is12H.value) {
    hours = hours % 12
    hours = hours ? hours : 12
  }

  const date = dayjs(val).format(settings.value.data.attributes.date_format)
  const time = `${twoDigits(hours)}:${twoDigits(_date.minute())}${options.seconds ? ':' + twoDigits(_date.second()) : ''}`

  return reactive<DatesEstimates>({
    date,
    time,
    datetime: `${date}${options.separator}${time}`,
  })
}
