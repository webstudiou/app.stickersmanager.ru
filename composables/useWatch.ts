type WatchEstimates = {
  hours: string
  minutes: string
  secundes: string
}

export const useWatch = (): WatchEstimates => {
  const twoDigits = (value: string | number) => {
    if (value != undefined) {
      if (value.toString().length <= 1) {
        return '0' + value.toString()
      }
      return value.toString()
    }
    else {
      return '00'
    }
  }

  const storeAuth = useStoreAuth()
  const is12H = computed(() => storeAuth.settings?.data.attributes.time_format ? (storeAuth.settings.data.attributes.time_format === '12h') : false)
  // const locale = computed(() => storeAuth.settings.data.attributes.locale || 'ru')

  const dt = new Date()
  const watchEstimates = reactive<WatchEstimates>({
    hours: twoDigits(dt.getHours()),
    minutes: twoDigits(dt.getMinutes()),
    secundes: twoDigits(dt.getSeconds()),
  })

  const updateCurrentTime = () => {
    const _dt = new Date()
    let hours = _dt.getHours()

    if (is12H.value) {
      hours = hours % 12
      hours = hours ? hours : 12
    }

    watchEstimates.hours = twoDigits(hours)
    watchEstimates.minutes = twoDigits(_dt.getMinutes())
    watchEstimates.secundes = twoDigits(_dt.getSeconds())
  }

  const updateTimeInterval = setInterval(updateCurrentTime, 1000)
  onBeforeUnmount(() => {
    clearInterval(updateTimeInterval)
  })

  return watchEstimates
}
