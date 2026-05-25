import { useMemo } from "react";
import { BaseNode } from "./baseNode";

export const MergeNode = (props) => {
    const fields = useMemo(() => [
        { name: 'mergeCondition', label: 'Merge Condition', type: 'text', defaultValue: '' }
    ], []);

    const handles = useMemo(() => [
        { id: 'input1', type: 'target' },
        { id: 'input2', type: 'target' },
        { id: 'output', type: 'source' }
    ], []);

    return <BaseNode {...props} title="Merge" fields={fields} handles={handles} />;
}