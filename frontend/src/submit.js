import { useStore } from './store';
import { useShallow } from 'zustand/react/shallow';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

export const SubmitButton = () => {
    const { nodes, edges } = useStore(useShallow(selector));

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });
            const data = await response.json();
            alert(`Nodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag}`);
        } catch (error) {
            alert('Error connecting to backend');
        }
    };

    return (
        <div
            className="
                absolute bottom-6 left-1/2 z-50
                -translate-x-1/2
            "
        >
            <div
                className="
                    flex items-center gap-4

                    rounded-2xl

                    border border-white/[0.08]

                    bg-black/40
                    backdrop-blur-2xl

                    px-4 py-3

                    shadow-[0_8px_30px_rgba(0,0,0,0.3)]
                "
            >
                <div className="flex items-center gap-2">
                    <div
                        className="
                            h-2 w-2
                            rounded-full

                            bg-[#7c3aed]

                            shadow-[0_0_10px_rgba(124,58,237,0.7)]
                        "
                    />

                    <span className="text-xs text-white/45 tracking-wide">
                        Ready
                    </span>
                </div>

                <div className="h-4 w-px bg-white/[0.08]" />

                <button
                    onClick={handleSubmit}
                    className="
                        group
                        relative

                        overflow-hidden

                        rounded-xl

                        border border-[#7c3aed]/20

                        bg-[#7c3aed]/90

                        px-5 py-2.5

                        text-sm
                        font-medium
                        text-white

                        transition-all duration-200

                        hover:bg-[#7c3aed]
                        hover:shadow-[0_0_20px_rgba(124,58,237,0.25)]

                        active:scale-[0.98]
                    "
                >
                    <div
                        className="
                            absolute inset-0

                            bg-gradient-to-r
                            from-transparent
                            via-white/10
                            to-transparent

                            opacity-0
                            transition-opacity duration-200

                            group-hover:opacity-100
                        "
                    />

                    <span className="relative z-10">
                        Run Pipeline
                    </span>
                </button>
            </div>
        </div>
    );
}