import { useState, useEffect } from 'react'
import { Node, Edge } from 'reactflow'
import { useShallow } from 'zustand/react/shallow'
import { useStore, StoreState } from './store'
import { Grape, UndoDot, RedoDot, CheckCircle, XCircle } from "lucide-react"

interface PipelineResult {
    num_nodes: number
    num_edges: number
    is_dag: boolean
}

const selector = (state: StoreState): { nodes: Node[], edges: Edge[] } => ({
    nodes: state.nodes,
    edges: state.edges,
})

export const PipelineHeader = () => {
    const { nodes, edges } = useStore(useShallow(selector))
    const [result, setResult] = useState<PipelineResult | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (result || error) {
            setVisible(true)
            const timer = setTimeout(() => {
                setVisible(false)
                setTimeout(() => {
                    setResult(null)
                    setError(null)
                }, 300)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [result, error])

    const handleRun = async () => {
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
        } catch {
            setError('Error connecting to backend')
        }
    }

    return (
        <>
            {/* Toast */}
            <div className={`fixed top-20 right-1/3 -translate-x-1/2 z-[100] transition-all duration-300 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}>
                {result && (
                    <div className="flex items-center gap-3 rounded-2xl border border-accent/20 bg-black/60 backdrop-blur-2xl px-4 py-3 shadow-glow-sm">
                        <CheckCircle size={15} className="text-accent shrink-0" />
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                                <span className="text-white/40 text-xs">Nodes</span>
                                <span className="text-white text-xs font-semibold">{result.num_nodes}</span>
                            </div>
                            <div className="h-3 w-px bg-white/10" />
                            <div className="flex items-center gap-1.5">
                                <span className="text-white/40 text-xs">Edges</span>
                                <span className="text-white text-xs font-semibold">{result.num_edges}</span>
                            </div>
                            <div className="h-3 w-px bg-white/10" />
                            <div className="flex items-center gap-1.5">
                                <span className="text-white/40 text-xs">DAG</span>
                                <span className={`text-xs font-semibold ${result.is_dag ? 'text-accent' : 'text-red-400'}`}>
                                    {result.is_dag ? 'Valid' : 'Invalid'}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-black/60 backdrop-blur-2xl px-4 py-3">
                        <XCircle size={15} className="text-red-400 shrink-0" />
                        <span className="text-red-400 text-xs">{error}</span>
                    </div>
                )}
            </div>

            {/* Header */}
            <div className="absolute top-0 left-0 z-50 w-full bg-black/30 backdrop-blur-xl border-b border-white/[0.08]">
                <div className="w-full flex items-center justify-between px-5 py-3">

                    {/* Left */}
                    <div className="flex items-center gap-4">
                        <Grape
                            size={30}
                            className="text-accent fill-accent/50 rotate-45 stroke-[1.7] transition-all duration-300 ease-out hover:scale-110 hover:drop-shadow-[0_0_14px_rgba(34,197,94,0.5)] drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]"
                        />
                        <p className="text-xl text-white font-mono tracking-wide">pipelix</p>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-2">
                        <UndoDot size={18} className="text-white/30 cursor-pointer hover:text-white/60 transition-colors" />
                        <span className="text-white/30">|</span>
                        <RedoDot size={18} className="text-white/30 cursor-pointer hover:text-white/60 transition-colors mr-4" />
                        <button className="rounded-xl hover:bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all duration-200 bg-transparent border border-white/[0.08]">
                            Save
                        </button>
                        <button
                            onClick={handleRun}
                            className="rounded-xl px-4 py-2 text-sm font-medium text-white transition-all duration-200 bg-accent hover:bg-accent-hover shadow-glow-sm"
                        >
                            Run Pipeline
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}