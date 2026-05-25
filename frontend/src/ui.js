import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap, BackgroundVariant } from 'reactflow';
import { useStore } from './store';
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

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(useShallow(selector));

    const getInitNodeData = (nodeID, type) => {
      return { id: nodeID, nodeType: `${type}` };
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
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

    const onDragOver = useCallback((event) => {
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
              bg-[#0a0a0a]
          "
      >
          {/* subtle top ambient */}
          <div
              className="
                  pointer-events-none
                  absolute inset-x-0 top-0 z-0
                  h-[180px]

                  bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.08),transparent_70%)]
              "
          />

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
              connectionLineType='smoothstep'
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
                  nodeColor={() => 'rgba(255,255,255,0.15)'}
                  maskColor="rgba(0,0,0,0.65)"
                  style={{
                      background: 'rgba(20,20,20,0.75)',
                      border:
                          '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '14px',
                      backdropFilter: 'blur(12px)',
                      boxShadow:
                          '0 8px 30px rgba(0,0,0,0.35)',
                  }}
              />
          </ReactFlow>
      </div>
  );
}