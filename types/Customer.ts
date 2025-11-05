export interface Gift {
  title: string
  image: string
  url: string
}

export interface Customer {
  id: number
  name: string
  company: string
  occasion: string
  budget: number
  gift?: Gift
}
