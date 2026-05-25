import { useMemo } from "react";
import { BaseNode } from "./baseNode";

export const ApiNode = (props) => {
    const fields = useMemo(() => [
        { name: 'method', label: 'Method', type: 'select', options: ['GET', 'POST', 'PUT', 'DELETE'], defaultValue: 'GET' }
    ], []);

    const handles = useMemo(() => [
        { id: 'input', type: 'target' },
        { id: 'output', type: 'source' }
    ], []);

    return <BaseNode {...props} title="API" fields={fields} handles={handles} />;
}