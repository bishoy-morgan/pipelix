import { useMemo } from 'react';
import { NodeProps } from 'reactflow'
import { BaseNode } from './baseNode';
import { NodeHandle, Field } from '../types/nodes';

interface MergeNodeData {
    mergeCondition: string
}


export const MergeNode = ({ id }: NodeProps<MergeNodeData>) => {
    const fields = useMemo((): Field[] => [
        { name: 'mergeCondition', label: 'Merge Condition', type: 'text', defaultValue: '' }
    ], []);

    const handles = useMemo((): NodeHandle[] => [
        { id: 'input1', type: 'target' },
        { id: 'input2', type: 'target' },
        { id: 'output', type: 'source' }
    ], []);

    return (
        <BaseNode 
            id={id} 
            title="Merge" 
            fields={fields} 
            handles={handles} 
        />
    );
}