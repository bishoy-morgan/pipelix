import React from "react"

interface DraggableNodeProps {
    type: string
    label: React.ReactNode
}

export const DraggableNode = ({ type, label }: DraggableNodeProps) => {
    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
        const appData = { nodeType };
        event.currentTarget.style.cursor = 'grabbing';
        event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            onDragStart={(event) => onDragStart(event, type)}
            onDragEnd={(event) => (event.currentTarget.style.cursor = 'grab')}
            className="cursor-grab flex items-center justify-center min-w-[80px] h-8 px-3 rounded-pill bg-surface border border-white/10 text-ink text-xs font-medium tracking-wide hover:border-accent hover:text-accent transition-colors duration-150"
            draggable
        >
            {label}
        </div>
    );
};