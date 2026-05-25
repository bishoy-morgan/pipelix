import { useMemo } from 'react';
import { BaseNode } from "./baseNode";

export const InputNode = (props) => {
    const fields = useMemo(() => [
    { name: 'inputName', label: 'Name', type: 'text', defaultValue: props.data?.inputName || props.id.replace('customInput-', 'input_') },
    { name: 'inputType', label: 'Type', type: 'select', options: ['Text', 'File'], defaultValue: props.data?.inputType || 'Text' }
    ], [props.data, props.id]);

    const handles = useMemo(() => [
    { id: 'value', type: 'source' }
    ], []);

    return <BaseNode {...props} title="Input" fields={fields} handles={handles} />;
}