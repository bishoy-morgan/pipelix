import { useMemo } from "react";
import { BaseNode } from "./baseNode";

export const OutputNode = (props) => {
    const fields = useMemo(() => [
        { name: 'outputName', label: 'Name', type: 'text', defaultValue: props.data?.outputName || props.id.replace('customOutput-', 'output_') },
        { name: 'outputType', label: 'Type', type: 'select', options: ['Text', 'Image'], defaultValue: props.data?.outputType || 'Text' }
    ], [props.data, props.id]);

    const handles = useMemo(() => [
        { id: 'value', type: 'target' }
    ], []);

    return <BaseNode {...props} title="Output" fields={fields} handles={handles} />;
}