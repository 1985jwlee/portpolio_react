import { useState } from 'react'
import { useInspectorStore } from '../../stores/inspectorStore'

function SnapshotManager() {
  const { gameObject, setGameObject } = useInspectorStore()
  const [snapshots, setSnapshots] = useState<{ name: string; data: any }[]>([])
  const [snapshotName, setSnapshotName] = useState('')

  const saveSnapshot = () => {
    if (!snapshotName.trim()) return
    setSnapshots([...snapshots, { name: snapshotName.trim(), data: gameObject }])
    setSnapshotName('')
  }

  const loadSnapshot = (data: any) => {
    setGameObject(data)
  }

  return (
    <div className="mt-4 text-sm">
      <h3 className="font-bold mb-2">📸 스냅샷</h3>
      <div className="flex mb-2 space-x-2">
        <input
          className="px-2 py-1 rounded bg-gray-800 border border-gray-600 w-full"
          value={snapshotName}
          onChange={(e) => setSnapshotName(e.target.value)}
          placeholder="스냅샷 이름 입력"
        />
        <button
          onClick={saveSnapshot}
          className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded"
        >
          저장
        </button>
      </div>

      <ul className="space-y-1">
        {snapshots.map((s, idx) => (
          <li key={idx} className="flex justify-between items-center bg-gray-800 px-3 py-1 rounded">
            <span>{s.name}</span>
            <button
              onClick={() => loadSnapshot(s.data)}
              className="text-blue-400 hover:underline text-xs"
            >
              불러오기
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SnapshotManager