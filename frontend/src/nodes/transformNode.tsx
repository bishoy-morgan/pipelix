import { useMemo } from 'react';
import { NodeProps } from 'reactflow'
import { BaseNode } from './baseNode';
import { NodeHandle, Field } from '../types/nodes';

interface TransformNodeData {
    transform: 'Uppercase' | 'Lowercase' | 'Trim'
}

export const TransformNode = ({ id }: NodeProps<TransformNodeData>) => {
    const fields = useMemo((): Field[] => [
        { name: 'transform', label: 'Transform', type: 'select', options: ['Uppercase', 'Lowercase', 'Trim'], defaultValue: 'Uppercase' }
    ], []);

    const handles = useMemo((): NodeHandle[] => [
        { id: 'input', type: 'target' },
        { id: 'output', type: 'source' }
    ], []);

    return (
        <BaseNode 
            id={id} 
            title="Transform" 
            fields={fields} 
            handles={handles} 
        />
    );
}