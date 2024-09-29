import type { NavigatorItems } from '~/types/portfolio'

declare global {
  namespace Projects {
    interface Project {
      data: {
        id: string
        type: 'project'
        attributes: {
          title: string
        }
        relationships: {
          apps: App[]
        }
      }
    }

    interface App {
      data: {
        id: string
        type: 'app'
        attributes: {
          title: string
          icon: 'google-sheets' | 'google-docs' | 'google-calendar' | 'google-forms' | 'yandex-calendar'
        }
      }
    }

    type D_Project = api.MetApiResponse<{ data: Project }>
  }
}

export {}
