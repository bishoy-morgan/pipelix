import { useMemo } from "react";
import { BaseNode } from "./baseNode";

export const TransformNode = (props) => {
    const fields = useMemo(() => [
        { name: 'transform', label: 'Transform', type: 'select', options: ['Uppercase', 'Lowercase', 'Trim'], defaultValue: 'Uppercase' }
    ], []);

    const handles = useMemo(() => [
        { id: 'input', type: 'target' },
        { id: 'output', type: 'source' }
    ], []);

    return <BaseNode {...props} title="Transform" fields={fields} handles={handles} />;
}