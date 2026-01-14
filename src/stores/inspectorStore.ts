import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { GameObject, Field } from '../types/inspectorTypes'

type InspectorState = {
    gameObject: GameObject
    selectedComponentId: string | null
  
    addComponent: (type: string, fields: Field[]) => void
    removeComponent: (id: string) => void
    updateField: (componentId: string, fieldName: string, newValue: any) => void
    selectComponent: (id: string) => void
    setGameObject: (obj: GameObject) => void
  }
  

  export const useInspectorStore = create<InspectorState>((set) => ({
    gameObject: {
      name: 'MyObject',
      components: [],
    },
    selectedComponentId: null,
  
    addComponent: (type, fields) =>
      set((state) => ({
        gameObject: {
          ...state.gameObject,
          components: [
            ...state.gameObject.components,
            {
              id: uuidv4(),
              type,
              fields,
            },
          ],
        },
      })),
  
    removeComponent: (id) =>
      set((state) => ({
        gameObject: {
          ...state.gameObject,
          components: state.gameObject.components.filter((c) => c.id !== id),
        },
        selectedComponentId:
          state.selectedComponentId === id ? null : state.selectedComponentId,
      })),
  
    updateField: (componentId, fieldName, newValue) =>
      set((state) => ({
        gameObject: {
          ...state.gameObject,
          components: state.gameObject.components.map((c) =>
            c.id === componentId
              ? {
                  ...c,
                  fields: c.fields.map((f) =>
                    f.name === fieldName ? { ...f, value: newValue } : f
                  ),
                }
              : c
          ),
        },
      })),
  
    selectComponent: (id) => set(() => ({ selectedComponentId: id })),

    setGameObject: (newObj: GameObject) => set({
      gameObject: newObj,
      selectedComponentId: null,
    }),
  }))