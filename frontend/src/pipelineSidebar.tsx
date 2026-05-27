import { Grape, LayoutDashboard, Workflow } from 'lucide-react'


const icons = [
    { id: 1, icon: Workflow, label: 'Workflow' },
    { id: 2, icon: LayoutDashboard, label: 'Dashboard' }
]


export interface PipelineSidebarProps {
    activeIconId: number | null
    setActiveIconId: (id: number | null) => void
}

export const PipelineSidebar = ({ activeIconId, setActiveIconId }: PipelineSidebarProps) => {
    const toggleSidebar = (iconId: number) => {
        setActiveIconId(activeIconId === iconId ? null : iconId)
    }

    return (
        <div className="absolute top-3 left-0 bottom-0 z-10 pt-5 w-16 h-[92vh] mt-12 shrink-0 bg-black/30 backdrop-blur-xl  border-white/[0.08] flex flex-col items-center gap-2 ">
            {icons.map((icon) => (
                <div 
                    key={icon.id}
                    className={`w-full h-12 flex items-center justify-center p-2 cursor-pointer transition-all duration-200 ${
                        activeIconId === icon.id
                            ? 'text-white border-l-2 border-white'
                            : 'text-white/50 hover:text-white/80 border-l-2 border-transparent'
                    }`}
                    onClick={() => toggleSidebar(icon.id)}
                    title={icon.label}
                >
                    <icon.icon size={24} />
                </div>
            ))}
        </div>
    )
}
