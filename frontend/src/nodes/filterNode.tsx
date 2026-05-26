import { useMemo } from 'react';
import { NodeProps } from 'reactflow'
import { BaseNode } from './baseNode';
import { NodeHandle, Field } from '../types/nodes';

interface FilterNodeData {
    condition: string
}

export const FilterNode = ({ data, id }: NodeProps<FilterNodeData>)  => {
    const fields = useMemo((): Field[] => [
        { name: 'condition', label: 'Condition', type: 'text', defaultValue: data?.condition || '' }
    ], [data]);

    const handles = useMemo((): NodeHandle[] => [
        { id: 'input', type: 'target' },
        { id: 'output', type: 'source' }
    ], []);

    return (
        <BaseNode 
            id={id} 
            title="Filter" 
            fields={fields} 
            handles={handles} 
        />
    );
}