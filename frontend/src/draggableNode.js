export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
        const appData = { nodeType };
        event.target.style.cursor = 'grabbing';
        event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            onDragStart={(event) => onDragStart(event, type)}
            onDragEnd={(event) => (event.target.style.cursor = 'grab')}
            className="cursor-grab flex items-center justify-center min-w-[80px] h-8 px-3 rounded-pill bg-surface border border-white/10 text-ink text-xs font-medium tracking-wide hover:border-accent hover:text-accent transition-colors duration-150"
            draggable
        >
            {label}
        </div>
    );
};