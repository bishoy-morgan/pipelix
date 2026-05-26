import { useMemo } from 'react';
import { NodeProps } from 'reactflow'
import { BaseNode } from './baseNode';
import { NodeHandle, Field } from '../types/nodes';

export const LLMNode = ({ id }: NodeProps<Record<string, never>>) => {
    const fields = useMemo((): Field[] => [], []);
    
    const handles = useMemo((): NodeHandle[] => [
        { type: 'target', id: 'system', style: { top: '33%' } },
        { type: 'target', id: 'prompt', style: { top: '67%' } },
        { type: 'source', id: 'response' }
    ], []);

    return (
        <BaseNode
            id={id}
            title="LLM"
            fields={fields}
            handles={handles}
        />
    );
};