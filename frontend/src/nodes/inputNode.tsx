import { useMemo } from 'react';
import { NodeProps } from 'reactflow'
import { BaseNode } from './baseNode';
import { NodeHandle, Field } from '../types/nodes';

interface InputNodeData {
    inputName: string
    inputType: 'Text' | 'File'
}

export const InputNode = ({ data, id }: NodeProps<InputNodeData>) => {
    const fields = useMemo((): Field[] => [
        { name: 'inputName', label: 'Name', type: 'text', defaultValue: data?.inputName || id.replace('customInput-', 'input_') },
        { name: 'inputType', label: 'Type', type: 'select', options: ['Text', 'File'], defaultValue: data?.inputType || 'Text' }
    ], [data, id]);

    const handles = useMemo((): NodeHandle[] => [
        { id: 'value', type: 'source' }
    ], []);

    return (
        <BaseNode 
            id={id} 
            title="Input" 
            fields={fields} 
            handles={handles} 
        />
    );
}