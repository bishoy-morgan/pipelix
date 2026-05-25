from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pipeline(BaseModel):
    nodes: List[Any]
    edges: List[Any]

def is_dag(nodes, edges):
    adjacency = {node['id']: [] for node in nodes}
    for edge in edges:
        source = edge['source']
        target = edge['target']
        if source in adjacency:
            adjacency[source].append(target)
    
    visited = set()
    rec_stack = set()
    
    def dfs(node_id):
        visited.add(node_id)
        rec_stack.add(node_id)
        
        for neighbor in adjacency.get(node_id, []):
            if neighbor in rec_stack:
                return True
            elif neighbor not in visited:
                if dfs(neighbor):
                    return True
        
        rec_stack.remove(node_id)
        return False
    
    for node in nodes:
        if node['id'] not in visited:
            if dfs(node['id']):
                return False
    return True

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag
    }