import { CSSProperties } from "react"

export interface Field {
  name: string
  label: string
  type: 'select' | 'textarea' | 'text' | 'number'
  defaultValue: string
  options?: string[]
}

export interface NodeHandle {
  id: string
  type: 'source' | 'target'
  style?: CSSProperties
}