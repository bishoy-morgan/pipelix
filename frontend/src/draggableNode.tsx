import React from "react"

interface DraggableNodeProps {
    type: string
    label: React.ReactNode
}

export const DraggableNode = ({ type, label }: DraggableNodeProps) => {
    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
        const appData = { nodeType }
        event.currentTarget.style.cursor = 'grabbing'
        event.dataTransfer.setData('application/reactflow', JSON.stringify(appData))
        event.dataTransfer.effectAllowed = 'move'
    }

    return (
        <div
            onDragStart={(event) => onDragStart(event, type)}
            onDragEnd={(event) => (event.currentTarget.style.cursor = 'grab')}
            draggable
            className="cursor-grab w-full"
        >
            {label}
        </div>
    )
}