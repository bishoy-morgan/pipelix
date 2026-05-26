import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, { 
  Controls, Background, MiniMap, BackgroundVariant, 
  ReactFlowInstance, ConnectionLineType 
} from 'reactflow';
import { StoreState, useStore } from './store';
import { useShallow } from 'zustand/react/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { PromptNode } from './nodes/promptNode';
import { FilterNode } from './nodes/filterNode';
import { TransformNode } from './nodes/transformNode';
import { ApiNode } from './nodes/apiNode';
import { MergeNode } from './nodes/mergeNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  prompt: PromptNode,
  filter: FilterNode,
  transform: TransformNode,
  api: ApiNode,
  merge: MergeNode
};


const selector = (state: StoreState): Pick<StoreState, 
  'nodes' | 'edges' | 'getNodeID' | 'addNode' | 
  'onNodesChange' | 'onEdgesChange' | 'onConnect'
> => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
})

export const PipelineUI = () => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(useShallow(selector));

    const getInitNodeData = (nodeID: string, type: string) => {
      return { id: nodeID, nodeType: `${type}` };
    }

    const onDrop = useCallback(
      (event: React.DragEvent<HTMLDivElement>) => {
          event.preventDefault();
          if (!reactFlowWrapper.current || !reactFlowInstance) return
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
            if (typeof type === 'undefined' || !type) return;

            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
            addNode(newNode);
          }
        },
        [reactFlowInstance, addNode, getNodeID]
    );

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

  return (
    <div
      ref={reactFlowWrapper}
      className="
        relative
        w-full
        h-full
        overflow-hidden

        bg-[#050505]
        text-white
      "
    >
      {/* ambient background */}
      <div className="absolute inset-0 z-0 pointer-events-none">

        {/* top left emerald fog */}
        <div
          className="
            absolute
            top-[-10%]
            left-[-5%]

            w-[500px]
            h-[500px]

            rounded-full

            bg-[#78FF65]/[0.08]

            blur-[120px]
          "
        />

        {/* center soft glow */}
        <div
          className="
            absolute
            top-[35%]
            left-[35%]

            w-[380px]
            h-[380px]

            rounded-full

            bg-[#78FF65]/[0.05]

            blur-[100px]
          "
        />

        {/* bottom right glow */}
        <div
          className="
            absolute
            bottom-[-10%]
            right-[-5%]

            w-[450px]
            h-[450px]

            rounded-full

            bg-[#78FF65]/[0.07]

            blur-[120px]
          "
        />
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType={ConnectionLineType.SmoothStep}
        className="relative z-10"
      >
        <Background
          color="rgba(255,255,255,0.05)"
          gap={24}
          size={1}
          variant={BackgroundVariant.Dots}
        />

        <Controls />

        <MiniMap
          pannable
          zoomable
          nodeColor={() => 'rgba(255,255,255,0.12)'}
          maskColor="rgba(0,0,0,0.72)"
          style={{
            background: 'rgba(255,255,255,0.03)',

            border:
              '1px solid rgba(255,255,255,0.08)',

            borderRadius: '18px',

            backdropFilter: 'blur(24px)',

            WebkitBackdropFilter: 'blur(24px)',

            boxShadow:
              `
                0 10px 40px rgba(0,0,0,0.42),
                inset 0 1px 0 rgba(255,255,255,0.04)
              `,
          }}
        />
      </ReactFlow>
    </div>
  );
}