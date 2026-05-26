import { useMemo } from 'react';
import { NodeProps } from 'reactflow'
import { BaseNode } from './baseNode';
import { NodeHandle, Field } from '../types/nodes';

interface ApiNodeData {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
}

export const ApiNode = ({ id }: NodeProps<ApiNodeData>) => {
    const fields = useMemo((): Field[] => [
        { name: 'method', label: 'Method', type: 'select', options: ['GET', 'POST', 'PUT', 'DELETE'], defaultValue: 'GET' }
    ], []);

    const handles = useMemo((): NodeHandle[] => [
        { id: 'input', type: 'target' },
        { id: 'output', type: 'source' }
    ], []);

    return (
        <BaseNode 
            id={id} 
            title="API" 
            fields={fields} 
            handles={handles} 
        />
    );
}