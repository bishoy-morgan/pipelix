import React, { useState } from 'react'
import {
    Brain, Filter, FileText,
    GitMerge,
    Search, 
    LucideIcon,
    ArrowRightToLine,
    LogOut,
    TextCursorInput,
    Webhook,
    Shuffle
} from 'lucide-react'
import { DraggableNode } from './draggableNode'


interface SidebarNode {
    type: string
    label: string
    description: string
    category: string
    icon: LucideIcon
}

const nodes: SidebarNode[] = [
    { type: 'llm', label: 'LLM', description: 'Run a language model', category: 'AI', icon: Brain },
    { type: 'prompt', label: 'Prompt', description: 'Build a prompt template', category: 'AI', icon: TextCursorInput },
    { type: 'filter', label: 'Filter', description: 'Filter by condition', category: 'Logic', icon: Filter },
    { type: 'merge', label: 'Merge', description: 'Merge multiple inputs', category: 'Logic', icon: GitMerge },
    { type: 'customInput', label: 'Input', description: 'Pipeline entry point', category: 'Data', icon: ArrowRightToLine },
    { type: 'customOutput', label: 'Output', description: 'Pipeline exit point', category: 'Data', icon: LogOut },
    { type: 'api', label: 'API', description: 'Make an HTTP request', category: 'Data', icon: Webhook },
    { type: 'text', label: 'Text', description: 'Static text with variables', category: 'Transform', icon: FileText },
    { type: 'transform', label: 'Transform', description: 'Transform text format', category: 'Transform', icon: Shuffle },
]

const categories = ['All', 'AI', 'Logic', 'Data', 'Transform']

const NodeRow = ({ node }: { node: SidebarNode }) => {
    const Icon = node.icon
    return (
        <DraggableNode type={node.type} label={
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent hover:border-white/[0.08] hover:bg-white/[0.04] transition-all duration-150 group/row">
                <div className="flex items-center justify-center w-8 h-8">
                    <Icon 
                        size={24} 
                        className="text-white/30 group-hover/row:text-white transition-colors duration-150" 
                    />
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="text-sm text-white/80 font-medium leading-tight group-hover/row:text-white transition-colors">
                        {node.label}
                    </span>
                    <span className="text-[11px] text-white/30 leading-tight truncate">
                        {node.description}
                    </span>
                </div>
            </div>
        } />
    )
}

const CategorySection = ({ category, nodes }: { category: string, nodes: SidebarNode[] }) => (
    <div className="my-4">
        <div className="flex items-center justify-between px-3 py-1.5 mb-1">
            <span className="text-sm font-semibold text-white/80 uppercase tracking-widest">
                {category}
            </span>
        </div>
        <div className="space-y-0.5">
            {nodes.map(node => <NodeRow key={node.type} node={node} />)}
        </div>
    </div>
)

interface SecondLayerSidebarProps {
    activeIconId: number | null
}

export const SecondLayerSidebar = ({ activeIconId }: SecondLayerSidebarProps) => {
    const [activeCategory, setActiveCategory] = useState('All')
    const [search, setSearch] = useState('')

    const filtered = nodes.filter(n => {
        const matchesCategory = activeCategory === 'All' || n.category === activeCategory
        const matchesSearch = n.label.toLowerCase().includes(search.toLowerCase()) ||
            n.description.toLowerCase().includes(search.toLowerCase())
        return matchesCategory && matchesSearch
    })

    const grouped = categories
        .filter(cat => cat !== 'All')
        .map(cat => ({ category: cat, nodes: filtered.filter(n => n.category === cat) }))
        .filter(g => g.nodes.length > 0)

    return (
        <div 
            className={`absolute top-16 left-[70px] bottom-0 w-72 h-[90vh] flex flex-col bg-black/30 backdrop-blur-xl border-r border-white/[0.08] rounded-xl
            ${activeIconId === 1 ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-opacity duration-300 z-50
            `}>

            {/* Search */}
            <div className="px-3 pt-4 pb-3">
                <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 focus-within:border-accent/40 transition-colors">
                    <Search size={13} className="text-white/30 shrink-0" />
                    <input
                        type="text"
                        placeholder="Search nodes..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="bg-transparent text-xs text-white/70 placeholder:text-white/25 outline-none w-full"
                    />
                </div>
            </div>

            {/* Category tabs */}
            <div className="flex gap-1 px-3 pb-3 overflow-x-auto scrollbar-hide">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-lg whitespace-nowrap transition-all duration-150 border
                            ${activeCategory === cat
                                ? 'bg-accent/15 text-accent border-accent/25'
                                : 'text-white/40 hover:text-white/70 border-transparent hover:bg-white/[0.04]'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Node list */}
            <div className="flex-1 overflow-y-auto px-1 pb-4">
                {filtered.length === 0 ? (
                    <p className="text-xs text-white/25 text-center pt-8">No nodes found</p>
                ) : activeCategory === 'All' ? (
                    grouped.map(g => (
                        <CategorySection key={g.category} category={g.category} nodes={g.nodes} />
                    ))
                ) : (
                    <div className="space-y-0.5 pt-1">
                        {filtered.map(node => <NodeRow key={node.type} node={node} />)}
                    </div>
                )}
            </div>
        </div>
    )
}