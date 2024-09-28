import dayjs from 'dayjs'
import { useStoreAuth } from '~/stores'

type DatesEstimates = {
  date: string
  // time: string
  // datetime: string
}

export const useDates = (val?: dayjs.Dayjs | string): DatesEstimates => {
  const _val = val || dayjs().toDate()

  const storeAuth = useStoreAuth()
  const settings = computed(() => storeAuth.settings)

  const date = dayjs(_val).format(settings.value.data.attributes.date_format)

  return reactive<DatesEstimates>({
    date,
    // time,
    // datetime: `${date}${options.separator}${time}`
  })
}
