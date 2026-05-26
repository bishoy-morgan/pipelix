import { useMemo } from 'react';
import { NodeProps } from 'reactflow'
import { BaseNode } from './baseNode';
import { NodeHandle, Field } from '../types/nodes';

interface PromptNodeData {
    prompt: string
}

export const PromptNode = ({ data, id }: NodeProps<PromptNodeData>) => {
    const fields = useMemo((): Field[] => [
        { name: 'prompt', label: 'Prompt', type: 'textarea', defaultValue: data?.prompt || '' }
    ], [data]);

    const handles = useMemo((): NodeHandle[] => [
        { id: 'input', type: 'target' },
        { id: 'output', type: 'source' }
    ], []);

    return (
        <BaseNode 
            id={id} 
            title="Prompt" 
            fields={fields} 
            handles={handles} 
        />
    );
}