declare global {
  export namespace api {
    interface MetApiQuery {
      options: Record<string, unknown>
      params: Record<string, unknown>
    }

    interface MetApiData {
      success: boolean
      type: 'success' | 'failure'
      message: string
      data: unknown
    }

    export interface MetApiResponse {
      status: 'success' | 'failure'
      benchmark: number
      success: boolean
      query: MetApiQuery
      data: MetApiData
    }

    export interface MetApiResults {
      benchmark: number
      status: 'success' | 'failure'
      query: MetApiQuery
      paginate?: MetApiPaginate
      data: unknown
    }

    export interface MetApiPaginate {
      current_page: number
      first_item: number
      last_item: number
      last_page: number
      pages: Array<number>
      per_page: number
      total: number
    }
  }
}

export { }
