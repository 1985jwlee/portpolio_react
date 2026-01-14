import { useInspectorStore } from '../../stores/inspectorStore'
import { Field } from '../../types/inspectorTypes'

const predefinedComponents: { type: string; fields: Field[] }[] = [
    {
      type: 'Transform',
      fields: [
        { name: 'position', type: 'vector3', value: { x: 0, y: 0, z: 0 }, meta: {
            x: { min: -100, max: 100 },
            y: { min: -100, max: 100 },
            z: { min: -100, max: 100 }
          } },
        { name: 'rotation', type: 'vector3', value: { x: 0, y: 0, z: 0 }, meta: {
            x: { min: -100, max: 100 },
            y: { min: -100, max: 100 },
            z: { min: -100, max: 100 }
          } },
        { name: 'scale', type: 'vector3', value: { x: 1, y: 1, z: 1 }, meta: {
            x: { min: -100, max: 100 },
            y: { min: -100, max: 100 },
            z: { min: -100, max: 100 }
          } },
      ],
    },
    {
      type: 'Renderer',
      fields: [
        { name: 'material', type: 'text', value: 'Default' },
        { name: 'visible', type: 'boolean', value: true },
      ],
    },
  ]

  function ComponentList() {
    

    const {
      gameObject,
      selectedComponentId,
      addComponent,
      removeComponent,
      selectComponent,
    } = useInspectorStore()
  
    return (
      <div>
        <h2 className="text-lg font-bold mb-2">Components</h2>
        <ul className="space-y-2">
          {gameObject.components.map((component) => (
            <li
              key={component.id}
              onClick={() => selectComponent(component.id)}
              className={`cursor-pointer px-3 py-2 rounded border ${
                selectedComponentId === component.id
                  ? 'bg-blue-600 border-blue-400'
                  : 'bg-gray-800 border-gray-700'
              } flex justify-between items-center`}
            >
              <span>{component.type}</span>
              <button
                className="text-sm text-red-400 hover:text-red-200"
                onClick={(e) => {
                  e.stopPropagation()
                  removeComponent(component.id)
                }}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
  
        <div className="mt-4">
          <h3 className="text-sm font-semibold mb-1">Add Component</h3>
          <div className="space-y-1">
            {predefinedComponents.map((c) => (
              <button
                key={c.type}
                onClick={() => addComponent(c.type, c.fields)}
                className="w-full text-left px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded"
              >
                ➕ {c.type}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  export default ComponentList