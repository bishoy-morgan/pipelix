import { create } from "zustand";
import {
  Node, Edge, NodeChange, EdgeChange, Connection,
  addEdge, applyNodeChanges, applyEdgeChanges, MarkerType
} from 'reactflow';

export interface StoreState {
  nodes: Node[]
  edges: Edge[]
  nodeIDs: Record<string, number>
  getNodeID: (type: string) => string
  addNode: (node: Node) => void
  onNodesChange: (changes: NodeChange[]) => void
  onEdgesChange: (changes: EdgeChange[]) => void
  onConnect: (connection: Connection) => void
  updateNodeField: (nodeId: string, fieldName: string, fieldValue: string) => void
  deleteNode: (nodeId: string) => void
  hintVisible: boolean
  showDropHint: () => void
  dismissDropHint: () => void
}

export const useStore = create<StoreState>((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {}, 
    getNodeID: (type: string) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: { type: MarkerType.Arrow, height: 20, width: 20 }}, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data: { ...node.data, [fieldName]: fieldValue } };
          }
          return node;
        }),
      });
    },
    deleteNode: (nodeId) => {
      const { nodes, edges } = get();
      set({
        nodes: nodes.filter(node => node.id !== nodeId),
        edges: edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId)
      });
    },
    hintVisible: false,
    showDropHint: () => set({ hintVisible: true }),
    dismissDropHint: () => set({ hintVisible: false }),
  }));
