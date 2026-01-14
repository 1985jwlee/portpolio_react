import { useEffect } from 'react'
import './App.css'

import ComponentList from './components/inspector/ComponentList'
import ComponentEditor from './components/inspector/ComponentEditor'
import ComponentPreview from './components/inspector/ComponentPreview'
import InspectorActions from './components/inspector/InspectorActions'
import SnapshotManager from './components/inspector/SnapshotManager'

import { useInspectorStore } from './stores/inspectorStore'
import { initialTemplate } from './data/inspectorTemplates'


function App() {
  const setGameObject = useInspectorStore(state => state.setGameObject)

  useEffect(() => {
    setGameObject(initialTemplate)
  }, [setGameObject])

  return (
    <div className="w-screen h-screen flex text-white font-sans">
      {/* 왼쪽: 컴포넌트 리스트 */}
      <div className="w-64 bg-gray-900 p-4 border-r border-gray-700 flex flex-col">
        <InspectorActions />
        <ComponentList />
        <SnapshotManager />
      </div>

      {/* 오른쪽: 선택된 컴포넌트 에디터 */}
      <div className="flex-1 bg-gray-950 p-4 overflow-y-auto border-r border-gray-700">
        <ComponentEditor />
      </div>

      <div className="w-96 bg-gray-950 p-4 overflow-y-auto">
        <ComponentPreview />
      </div>
    </div>
  )
}

export default App
