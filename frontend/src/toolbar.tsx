import {
    Brain,
    Database,
    Filter,
    FileText,
    GitMerge,
    Sparkles,
    Wand2,
    Ligature,
    Type,
    LucideIcon
} from "lucide-react";

import { DraggableNode } from "./draggableNode";


interface ToolbarNode {
    type: string
    label: string
    icon: LucideIcon
}

const nodes: ToolbarNode[] = [
    { type: "customInput", label: "Input", icon: FileText },
    { type: "llm", label: "LLM", icon: Brain },
    { type: "customOutput", label: "Output", icon: Sparkles },
    { type: "text", label: "Text", icon: Type },
    { type: "prompt", label: "Prompt", icon: Wand2 },
    { type: "filter", label: "Filter", icon: Filter },
    { type: "api", label: "API", icon: Database },
    { type: "merge", label: "Merge", icon: GitMerge },
];

export const PipelineToolbar = () => {
    return (
        <div className="absolute top-0 left-0 z-50 w-full flex flex-col items-center justify-center gap-3">
        
            {/* Layer 1 */}
            <div
                className="
                    w-full
                    flex items-center justify-between
                    border-b border-white/10
                    bg-black/30
                    backdrop-blur-xl
                    px-5 py-3
                    shadow-[0_8px_40px_rgba(0,0,0,0.45)]
                "
            >
                {/* Ambient Glow */}
                <div
                    className="
                        pointer-events-none
                        absolute inset-x-0 top-0 h-full
                        bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.12),transparent_70%)]
                    "
                />

                {/* Left */}
                <div className="relative flex items-center gap-4">
                    <Ligature
                        size={36}
                        className="text-white/70 rotate-90"
                    />
                    <p className="text-2xl font-semibold text-white tracking-widest uppercase">
                        Nexus
                    </p>
                </div>

                {/* Right */}
                <div className="relative flex items-center gap-2">
                    <button
                        className="
                            relative overflow-hidden
                            rounded-xl
                            bg-[#7c3aed]
                            px-4 py-2
                            text-sm font-medium text-white
                            transition-all duration-200
                            hover:bg-[#6d28d9]
                            shadow-[0_0_20px_rgba(124,58,237,0.35)]
                        "
                    >
                        Save Pipeline
                    </button>
                </div>
            </div>

            {/* Layer 2 */}
            <div
                className="
                    w-fit
                    flex flex-wrap items-center justify-center gap-2
                    rounded-2xl
                    border border-white/10
                    bg-black/25
                    backdrop-blur-xl
                    px-6 py-3
                    shadow-[0_10px_50px_rgba(0,0,0,0.45)]
                "
            >
                {nodes.map((node) => {
                    const Icon = node.icon;

                    return (
                        <div
                            key={node.type}
                            className="
                                group
                                relative
                                overflow-hidden
                                rounded-xl
                                border border-white/10
                                bg-white/[0.03]
                                transition-all duration-200
                                hover:border-[#7c3aed]/30
                                hover:bg-[#7c3aed]/[0.08]
                                hover:shadow-[0_0_20px_rgba(124,58,237,0.12)]
                            "
                        >
                            {/* Hover Glow */}
                            <div
                                className="
                                    absolute inset-0 opacity-0
                                    transition-opacity duration-200
                                    group-hover:opacity-100
                                    bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.10),transparent_70%)]
                                "
                            />

                            <DraggableNode
                                type={node.type}
                                label={
                                    <div className="relative flex items-center gap-2 px-2">
                                        <div
                                            className="
                                                flex h-7 w-7 items-center justify-center
                                                rounded-lg
                                                bg-black/30
                                                border border-white/5
                                                transition-all duration-200
                                                group-hover:border-[#7c3aed]/20
                                            "
                                        >
                                            <Icon
                                                size={14}
                                                className="
                                                    text-white/70
                                                    transition-all duration-200
                                                    group-hover:text-white
                                                "
                                            />
                                        </div>

                                        <span
                                            className="
                                                text-sm text-white/85
                                                transition-all duration-200
                                                group-hover:text-white
                                            "
                                        >
                                            {node.label}
                                        </span>
                                    </div>
                                }
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};