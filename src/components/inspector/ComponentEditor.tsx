import { useInspectorStore } from '../../stores/inspectorStore'
import FieldRenderer from './FieldRenderer'

function ComponentEditor() {
  const { gameObject, selectedComponentId, updateField } = useInspectorStore()

  const selected = gameObject.components.find(
    (c) => c.id === selectedComponentId
  )

  if (!selected) {
    return <div className="text-gray-400">No component selected</div>
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-2">{selected.type}</h2>
      <div className="space-y-3">
        {selected.fields.map((field) => (
          <div key={field.name}>
            <FieldRenderer
              field={field}
              onChange={(value) =>
                updateField(selected.id, field.name, value)
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ComponentEditor