import { useMemo } from "react";
import { BaseNode } from "./baseNode";

export const LLMNode = ({ id, data }) => {
    const fields = useMemo(() => [], [data]);
    const handles = useMemo(() => [
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