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
    LucideIcon,
    Grape,
    RedoDot,
    UndoDot
} from "lucide-react";

interface HeaderNode {
    type: string
    label: string
    icon: LucideIcon
}

const nodes: HeaderNode[] = [
    { type: "customInput", label: "Input", icon: FileText },
    { type: "llm", label: "LLM", icon: Brain },
    { type: "customOutput", label: "Output", icon: Sparkles },
    { type: "text", label: "Text", icon: Type },
    { type: "prompt", label: "Prompt", icon: Wand2 },
    { type: "filter", label: "Filter", icon: Filter },
    { type: "api", label: "API", icon: Database },
    { type: "merge", label: "Merge", icon: GitMerge },
];

export const PipelineHeader = () => {
    return (
        <div className="absolute top-0 left-0 -z-10 w-full flex flex-col items-center justify-center gap-3 bg-black/30 backdrop-blur-xl border-r border-white/[0.08] rounded-tl-2xl">
        
            <div className="w-full flex items-center justify-between px-5 py-3">

                {/* Left */}
                <div className="relative flex items-center gap-6">
                    <Grape size={30} className="text-accent rotate-45 fill-accent/50" />
                    <p className="text-xl text-white font-mono tracking-wide">
                        pipelix
                    </p>
                </div>

                {/* Center */}
                <div className="flex items-center justify-center gap-2 mr-6">
                    <UndoDot size={20} className="text-white/50 hover:text-white transition-colors cursor-pointer mr-2" />
                    |
                    <RedoDot size={20} className="text-white/50 hover:text-white transition-colors cursor-pointer ml-2" />
                </div>


                {/* Right */}
                <div className="relative flex items-center gap-2">
                    <button
                        className="
                            relative overflow-hidden
                            rounded-xl
                            hover:bg-white/10
                            px-4 py-2
                            text-sm font-medium text-white
                            transition-all duration-200
                            bg-transparent
                            border border-white/[0.08]
                        "
                    >
                        Save
                    </button>
                    <button
                        className="
                            relative overflow-hidden
                            rounded-xl
                            px-4 py-2
                            text-sm font-medium text-white
                            transition-all duration-200
                            bg-accent 
                            hover:bg-accent-hover 
                            shadow-[0_0_20px_rgba(34,197,94,0.25)]
                        "
                    >
                        Run Pipeline
                    </button>
                </div>
            </div>
        </div>
    );
};