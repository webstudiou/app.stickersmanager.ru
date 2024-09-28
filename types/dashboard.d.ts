declare global {
  interface Dashboard {
    data: {
      id: string
      type: 'dashboard'
      attributes: {
        title: string
      }
    }
  }
}

export {}
