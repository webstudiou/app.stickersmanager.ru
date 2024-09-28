declare global {
  namespace Users {
    interface User {
      data: {
        id: string
        type: 'user'
        attributes: {
          name: string
          image: Avatars | null
          email: string
        }
        relationships: {
          settings: Setting
          dashboard: Dashboard
        }
      }
    }

    interface Setting {
      data: {
        id: string
        type: 'settings'
        attributes: {
          first_name: string
          middle_name: string
          last_name: string
          abouts: string

          address: string
          state: string
          city: string
          postcode: string
          country: string
          phone: string

          color: ELEMENTS.COLOR
          locale: Locale
          timezone: string

          theme: Theme
          time_format: TimeFormat
          date_format: DateFormat
          week: WeekStart

          visited: string
        }
      }
    }

    type D_User = api.MetApiResponse<{ data: User }>
  }
}

export {}
