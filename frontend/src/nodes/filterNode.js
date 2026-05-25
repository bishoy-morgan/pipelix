import { useMemo } from "react";
import { BaseNode } from "./baseNode";

export const FilterNode = (props) => {
    const fields = useMemo(() => [
        { name: 'condition', label: 'Condition', type: 'text', defaultValue: props.data?.condition || '' }
    ], [props.data]);

    const handles = useMemo(() => [
        { id: 'input', type: 'target' },
        { id: 'output', type: 'source' }
    ], []);

    return <BaseNode {...props} title="Filter" fields={fields} handles={handles} />;
}