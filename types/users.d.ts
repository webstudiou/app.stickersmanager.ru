declare global {
  namespace Users {
    interface User {
      data: {
        id: string
        type: 'user'
        attributes: {
          name: string
          email: string
        }
        relationships: {
          settings: Setting
        }
      }
    }

    interface Setting {
      data: {
        id: string
        type: 'settings'
        attributes: {
          image: Avatar | null

          firstName: string
          middleName: string
          lastName: string
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

          themeMode: Theme
          timeFormat: TimeFormat
          dateFormat: DateFormat
          weekStart: WeekStart

          visited: string
        }
      }
    }

    type D_User = api.MetApiResponse<{ data: User }>
  }
}

export {}
