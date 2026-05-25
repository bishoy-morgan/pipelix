import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
    const [currText, setCurrText] = useState(data?.text || '{{input}}');
    const [dimensions, setDimensions] = useState({ width: 200, height: 80 });
    const [variables, setVariables] = useState([]);

    useEffect(() => {
        const lines = currText.split('\n');
        const longestLine = Math.max(...lines.map(l => l.length));
        const newWidth = Math.max(200, longestLine * 8 + 16);
        const newHeight = Math.max(80, lines.length * 20 + 10);
        setDimensions({ width: newWidth, height: newHeight });

        const extracted = currText.match(/\{\{(\w+)\}\}/g)
            ?.map(v => v.slice(2, -2).trim()) || [];
        setVariables(extracted);
    }, [currText]);

    return (
        <div
            className="relative bg-surface border border-white/10 rounded-xl p-3 shadow-[0_4px_24px_rgba(0,0,0,0.4),0_0_0_1px_rgba(124,58,237,0.15)]"
            style={{ width: dimensions.width, height: dimensions.height }}
        >
            <div className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-2">
                Text
            </div>

            <textarea
                className="nodrag w-full h-[calc(100%-28px)] bg-black/40 border border-white/10 rounded-md px-2 py-1 text-white text-xs resize-none focus:outline-none focus:border-accent"
                value={currText}
                onChange={(e) => setCurrText(e.target.value)}
            />

            {variables.map((variable, index) => (
                <Handle
                    key={variable}
                    id={`${id}-${variable}`}
                    type="target"
                    position={Position.Left}
                    style={{ top: `${(index + 1) * 20}px` }}
                />
            ))}

            <Handle
                id={`${id}-output`}
                type="source"
                position={Position.Right}
            />
        </div>
    );
}