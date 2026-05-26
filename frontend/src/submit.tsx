import { useState } from 'react'
import { Node, Edge } from 'reactflow'
import { useShallow } from 'zustand/react/shallow'
import { useStore, StoreState } from './store'

interface PipelineResult {
    num_nodes: number
    num_edges: number
    is_dag: boolean
}

const selector = (state: StoreState): { nodes: Node[], edges: Edge[] } => ({
    nodes: state.nodes,
    edges: state.edges,
})

export const SubmitButton = () => {
    const { nodes, edges } = useStore(useShallow(selector))
    const [result, setResult] = useState<PipelineResult | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async () => {
        setResult(null)
        setError(null)
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            })
            const data: PipelineResult = await response.json()
            setResult(data)
        } catch (err) {
            setError('Error connecting to backend')
        }
    }

    return (
        <div className="absolute bottom-6 left-1/2 z-50 -translate-x-1/2 flex flex-col items-center gap-3">

            {/* Result Panel */}
            {result && (
                <div className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-2xl px-5 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                    <div className="flex items-center gap-1.5">
                        <span className="text-white/40 text-xs">Nodes</span>
                        <span className="text-white text-xs font-semibold">{result.num_nodes}</span>
                    </div>
                    <div className="h-4 w-px bg-white/[0.08]" />
                    <div className="flex items-center gap-1.5">
                        <span className="text-white/40 text-xs">Edges</span>
                        <span className="text-white text-xs font-semibold">{result.num_edges}</span>
                    </div>
                    <div className="h-4 w-px bg-white/[0.08]" />
                    <div className="flex items-center gap-1.5">
                        <span className="text-white/40 text-xs">DAG</span>
                        <span className={`text-xs font-semibold ${result.is_dag ? 'text-emerald-400' : 'text-red-400'}`}>
                            {result.is_dag ? 'Valid' : 'Invalid'}
                        </span>
                    </div>
                </div>
            )}

            {/* Error Panel */}
            {error && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 backdrop-blur-2xl px-5 py-3">
                    <span className="text-red-400 text-xs">{error}</span>
                </div>
            )}

            {/* Submit Bar */}
            <div className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-2xl px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#7c3aed] shadow-[0_0_10px_rgba(124,58,237,0.7)]" />
                    <span className="text-xs text-white/45 tracking-wide">Ready</span>
                </div>
                <div className="h-4 w-px bg-white/[0.08]" />
                <button
                    onClick={handleSubmit}
                    className="group relative overflow-hidden rounded-xl border border-[#7c3aed]/20 bg-[#7c3aed]/90 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-[#7c3aed] hover:shadow-[0_0_20px_rgba(124,58,237,0.25)] active:scale-[0.98]"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    <span className="relative z-10">Run Pipeline</span>
                </button>
            </div>
        </div>
    )
}