declare global {
  interface Avatars {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    xxl: string
    xxxl: string
  }

  interface Config {
    app: {
      title: string
      description: string
      locale: Locale
      version: string
    }
    org: {
      /* bank: string
            bik: string
            email: string
            fact_address: string
            fullName: string
            inn: string
            kpp: string
            ks: string
            mail_address: string
            name: string
            ogrn: string
            okato: string
            okpo: string
            oktmo: string
            okved: string
            phone: string
            rs: string
            ur_address: string */
      url: string
      /* vat: string */
    }
  }

  type D_Config = api.MetApiResponse<{ data: Config }>
}

export {}
