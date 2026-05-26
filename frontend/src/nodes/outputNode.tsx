import { useMemo } from 'react';
import { NodeProps } from 'reactflow'
import { BaseNode } from './baseNode';
import { NodeHandle, Field } from '../types/nodes';

interface OutputNodeData {
    outputName: string
    outputType: 'Text' | 'Image'
}

export const OutputNode = ({ data, id }: NodeProps<OutputNodeData>) => {
    const fields = useMemo((): Field[] => [
        { name: 'outputName', label: 'Name', type: 'text', defaultValue: data?.outputName || id.replace('customOutput-', 'output_') },
        { name: 'outputType', label: 'Type', type: 'select', options: ['Text', 'Image'], defaultValue: data?.outputType || 'Text' }
    ], [data, id]);

    const handles = useMemo((): NodeHandle[] => [
        { id: 'value', type: 'target' }
    ], []);

    return (
        <BaseNode 
            id={id} 
            title="Output" 
            fields={fields} 
            handles={handles} 
        />
    );
}