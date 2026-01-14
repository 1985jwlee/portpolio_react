import { useInspectorStore } from '../../stores/inspectorStore'
import { useRef } from 'react'

function InspectorActions() {
    
    const { gameObject, setGameObject } = useInspectorStore()
    const fileInputRef = useRef<HTMLInputElement>(null)
  
    const handleSave = () => {
      const json = JSON.stringify(gameObject, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'gameObject.json'
      a.click()
      URL.revokeObjectURL(url)
    }
  
    const handleLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string)
          setGameObject(parsed)
        } catch (err) {
          alert('잘못된 JSON 형식입니다.')
        }
      }
      reader.readAsText(file)
    }
  
    return (
      <div className="flex space-x-3 mb-4">
        <button
          onClick={handleSave}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center"
        >
          💾 저장
        </button>
        <label className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded flex items-center">
          📥 불러오기
          <input
            type="file"
            accept="application/json"
            ref={fileInputRef}
            onChange={handleLoad}
            className="hidden"
          />
        </label>
      </div>
    )
  }
  
  export default InspectorActions