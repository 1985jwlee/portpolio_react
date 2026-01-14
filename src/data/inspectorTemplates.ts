import { GameObject } from '../types/inspectorTypes'

export const initialTemplate: GameObject = {
    components: [
        {
            id: 'transform',
            type: 'Transform',
            fields: [
                { name: 'x', type: 'number', value: 0 },
                { name: 'y', type: 'number', value: 0 },
                { name: 'rotation', type: 'number', value: 0 },
            ],
        },
        {
            id: 'renderer',
            type: 'Renderer',
            fields: [
                { name: 'sprite', type: 'text', value: 'default.png' },
                { name: 'visible', type: 'boolean', value: true },
            ],
        },
    ],
    name: 'template_object'
}