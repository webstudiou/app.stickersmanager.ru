declare global {
  namespace Models {
    interface Timestamps {
      created_at: string
      updated_at?: string
      deleted_at?: string
    }
  }
}

export {}
