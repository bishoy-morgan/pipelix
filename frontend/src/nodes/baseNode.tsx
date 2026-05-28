import { useState } from "react";
import { Handle, Position } from "reactflow";
import { Field, NodeHandle } from '../types/nodes'

export interface BaseNodeProps {
    id: string
    title: string
    fields: Field[]
    handles: NodeHandle[]
}

export const BaseNode = ({ id, title, fields, handles }: BaseNodeProps) => {

    const [fieldValues, setFieldValues] = useState<Record<string, string>>(
        Object.fromEntries(fields.map(f => [f.name, f.defaultValue]))
    );

    return (
        <div className="node-card">
            {handles.filter(h => h.type === 'target').map(h => (
                <Handle key={h.id} type="target" position={Position.Left}
                    id={`${id}-${h.id}`} style={h.style} />
            ))}

            <div className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-2">
                {title}
            </div>

            {fields.map(field => (
                <div key={field.name} className="mb-2">
                    <label className="block text-white/30 text-[11px] mb-1">{field.label}</label>
                    {field.type === 'select' ? (
                        <select
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-1 text-white text-xs focus:outline-none focus:border-accent transition-colors"
                            value={fieldValues[field.name]}
                            onChange={(e) => setFieldValues(prev => ({ ...prev, [field.name]: e.target.value }))}
                        >
                            {field.options?.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    ) : field.type === 'textarea' ? (
                        <textarea
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-1 text-white text-xs resize-none focus:outline-none focus:border-accent transition-colors"
                            value={fieldValues[field.name]}
                            onChange={(e) => setFieldValues(prev => ({ ...prev, [field.name]: e.target.value }))}
                        />
                    ) : (
                        <input
                            type={field.type}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-1 text-white text-xs focus:outline-none focus:border-accent transition-colors"
                            value={fieldValues[field.name]}
                            onChange={(e) => setFieldValues(prev => ({ ...prev, [field.name]: e.target.value }))}
                        />
                    )}
                </div>
            ))}

            {handles.filter(h => h.type === 'source').map(h => (
                <Handle key={h.id} type="source" position={Position.Right}
                    id={`${id}-${h.id}`} />
            ))}
        </div>
    );
}