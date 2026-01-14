export type Vector3 = {
    x: number
    y: number
    z: number
  }

  export type FieldType = "number" | "text" | "boolean" | "vector3" | "select"

  export type FieldValue =
  | number
  | string
  | boolean
  | Vector3
  | string[] // select용 옵션

  export type Field = {
    name: string
    type: FieldType
    value: FieldValue
    min?: number
    max?: number
    required?: boolean
    options?: string[] // select 필드의 경우
    meta?: {
        x?: { min?: number; max?: number }
        y?: { min?: number; max?: number }
        z?: { min?: number; max?: number }
      }
  }

  export type ComponentData = {
    id: string
    type: string
    fields: Field[]
  }

  export type GameObject = {
    name: string
    components: ComponentData[]
  }