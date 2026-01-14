import { useState } from 'react'
import { Field } from '../../types/inspectorTypes'

type Props = {
  field: Field
  onChange: (value: any) => void
}

function FieldRenderer({ field, onChange }: Props) {
    const { name, type, value, min, max, required } = field
    const [error, setError] = useState<string | null>(null)
  
    const validate = (val: any): boolean => {
      if (type === 'number') {
        if (isNaN(val)) {
          setError('숫자를 입력해야 합니다.')
          return false
        }
        if (min !== undefined && val < min) {
          setError(`최소값은 ${min}입니다.`)
          return false
        }
        if (max !== undefined && val > max) {
          setError(`최대값은 ${max}입니다.`)
          return false
        }
      }
  
      if (type === 'text' && required && val.trim() === '') {
        setError('값을 입력해야 합니다.')
        return false
      }
  
      setError(null)
      return true
    }
    
  
    const handleChange = (val: any) => {
      if (validate(val)) {
        onChange(val)
      }
    }
  
    switch (type) {
      case 'number':
        return (
          <label className="block">
            <span className="text-sm">{name}</span>
            <input
              type="number"
              value={value as number}
              onChange={(e) => handleChange(Number(e.target.value))}
              className={`mt-1 block w-full rounded bg-gray-800 p-1 border ${
                error ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
          </label>
        )
      case 'text':
        return (
          <label className="block">
            <span className="text-sm">{name}</span>
            <input
              type="text"
              value={value as string}
              onChange={(e) => handleChange(e.target.value)}
              className={`mt-1 block w-full rounded bg-gray-800 p-1 border ${
                error ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
          </label>
        )
      case 'boolean':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value as boolean}
              onChange={(e) => onChange(e.target.checked)}
            />
            <span>{name}</span>
          </label>
        )
      case 'vector3':
        const vector = value as { x: number; y: number; z: number }
        return (
          <fieldset className="space-y-1">
            <legend className="text-sm">{name}</legend>
            {['x', 'y', 'z'].map((axis) => (
              <input
                key={axis}
                type="number"
                value={vector[axis as keyof typeof vector]}
                onChange={(e) =>
                  onChange({
                    ...vector,
                    [axis]: Number(e.target.value),
                  })
                }
                min={field.meta?.[axis as 'x' | 'y' | 'z']?.min}
                max={field.meta?.[axis as 'x' | 'y' | 'z']?.max}
                className="w-full rounded bg-gray-800 border border-gray-600 p-1"
                placeholder={axis}
              />
            ))}
          </fieldset>
        )
      case 'select':
        return (
          <label className="block">
            <span className="text-sm">{name}</span>
            <select
              value={value as string}
              onChange={(e) => onChange(e.target.value)}
              className="mt-1 block w-full rounded bg-gray-800 border border-gray-600 p-1"
            >
              {(field.options || []).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
        )
      default:
        return <div>지원하지 않는 필드입니다</div>
    }
  }
  
  export default FieldRenderer