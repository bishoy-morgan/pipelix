import { useMemo } from "react";
import { BaseNode } from "./baseNode";

export const PromptNode = (props) => {
    const fields = useMemo(() => [
        { name: 'prompt', label: 'Prompt', type: 'textarea', defaultValue: props.data?.prompt || '' }
    ], [props.data]);

    const handles = useMemo(() => [
        { id: 'input', type: 'target' },
        { id: 'output', type: 'source' }
    ], []);

    return <BaseNode {...props} title="Prompt" fields={fields} handles={handles} />;
}