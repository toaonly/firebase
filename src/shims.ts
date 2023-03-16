declare global {
  type Nullish<T = any> = T | null | undefined
  type Numberlish = number | string
}

export {}
