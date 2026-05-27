
import { PipelineSidebar } from './pipelineSidebar';
import { PipelineHeader } from './pipelineHeader';
import { PipelineUI } from './ui';
import { SecondLayerSidebar } from './secondLayerSidebar';
import { useState } from 'react';

function App() {
  const [activeIconId, setActiveIconId] = useState<number | null>(null)

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-[#050505]">
      <main className="absolute inset-0">
        <PipelineUI />
      </main>

      <header className="absolute top-0 left-0 right-0 h-12 z-50">
        <PipelineHeader />
      </header>

      <aside className="relative z-50 flex">
        <PipelineSidebar activeIconId={activeIconId} setActiveIconId={setActiveIconId} />
        <SecondLayerSidebar activeIconId={activeIconId} />
      </aside>
    </div>
  )
}
export default App;