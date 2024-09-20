import { useI18n } from 'vue-i18n'

export const useLangs = (title: string, params?: any) => {
  const { t, te } = useI18n()
  return te(title) ? t(title, params) : title
}
