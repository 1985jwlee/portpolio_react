import { useInspectorStore } from '../../stores/inspectorStore'

function ComponentPreview() {
  const { gameObject, selectedComponentId } = useInspectorStore()

  const selected = gameObject.components.find(
    (c) => c.id === selectedComponentId
  )

  if (!selected) return <div className="text-gray-400">No component selected</div>

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">Preview JSON</h2>
      <pre className="bg-gray-800 p-3 rounded text-sm overflow-auto max-h-96 border border-gray-700">
        {JSON.stringify(selected, null, 2)}
      </pre>
    </div>
  )
}

export default ComponentPreview