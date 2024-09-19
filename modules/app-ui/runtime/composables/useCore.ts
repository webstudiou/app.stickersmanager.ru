import { useAppConfig } from '#imports'
import { get, mergeConfig, omit } from '#app-ui/utils'

export const useCore = <T>(key: string, $ui?: Ref<Partial<T> & { strategy?: Strategy } | undefined>, $config?: Ref<T> | T, $wrapperClass?: Ref<string>, withAppConfig: boolean = false) => {
  const $attrs = useAttrs()
  const appConfig: UI = useAppConfig()

  const ui = computed(() => {
    const _ui = toValue($ui)
    const _config = toValue($config)
    const _wrapperClass = toValue($wrapperClass)

    return mergeConfig<T>(
      (_ui?.strategy || appConfig.ui.strategy) as Strategy,
      _wrapperClass ? { wrapper: _wrapperClass } : {},
      _ui || {},
      (import.meta.dev || withAppConfig) ? get(appConfig.ui, key, {}) : {},
      _config || {},
    )
  })

  const attrs = computed(() => omit($attrs, ['class']))

  return {
    ui,
    attrs,
  }
}
