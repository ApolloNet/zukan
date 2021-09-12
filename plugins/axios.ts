import { Context } from '@nuxt/types'

export default function ({ $axios, redirect }: Context) {
  $axios.onError((error) => {
    if (error.response && error.response.status === 500) {
      redirect('/sorry')
    }
  })
}
