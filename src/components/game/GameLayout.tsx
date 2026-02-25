'use client';

import { useCallback, useEffect } from 'react';
import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor, TouchSensor } from '@dnd-kit/core';
import dynamic from 'next/dynamic';
import { useGameStore } from '@/stores/gameStore';
import { getNextCorrectOrbital } from '@/lib/chemistry/validation';
import { usePlaceWithAudio } from '@/hooks/usePlaceWithAudio';
import { audio } from '@/lib/game/audio';
import { BorderBeam, ScanLine } from '@/components/ui/TerminalEffects';
import { EnergyDiagram } from './EnergyDiagram';
import { ElectronTray } from './ElectronTray';
import { ElectronConfig } from './ElectronConfig';
import { PeriodicStrip } from './PeriodicStrip';
import { GameHUD } from './GameHUD';
import { ViolationToast } from './ViolationToast';
import { LevelComplete } from './LevelComplete';
import { QuantumInfo } from './QuantumInfo';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { StreakFlame } from './StreakFlame';
import { TeachingTerminal } from './TeachingTerminal';
import type { Spin } from '@/types/chemistry';

const OrbitalViewer = dynamic(
  () => import('@/components/three/OrbitalViewer').then(m => ({ default: m.OrbitalViewer })),
  {
    loading: () => <div className="h-full bg-black border border-border flex items-center justify-center font-mono text-foreground/20 text-xs">loading 3d viewer...</div>,
    ssr: false,
  }
);

interface GameLayoutProps {
  showReveal?: boolean;
  onReveal?: () => void;
}

export function GameLayout({ showReveal, onReveal }: GameLayoutProps = {}) {
  const selectedSpin = useGameStore(s => s.selectedSpin);
  const mode = useGameStore(s => s.mode);
  const placeWithAudio = usePlaceWithAudio();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    })
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { over, active } = event;
    if (!over) return;

    const spin = (active.data?.current?.spin as Spin) ?? selectedSpin;
    let orbitalId: string;

    if (over.id === 'orbital-viewer-drop') {
      const state = useGameStore.getState();
      const next = getNextCorrectOrbital(state.orbitals);
      if (!next) return;
      orbitalId = next.orbitalId;
    } else {
      orbitalId = over.id as string;
    }

    placeWithAudio(orbitalId, spin);
  }, [placeWithAudio, selectedSpin]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'u' || e.key === 'U') {
        useGameStore.getState().setSelectedSpin('up');
      } else if (e.key === 'd' || e.key === 'D') {
        useGameStore.getState().setSelectedSpin('down');
      } else if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        useGameStore.getState().undoLastPlacement();
        audio.playUndo();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="h-screen flex flex-col bg-background overflow-hidden">
        {/* Top HUD */}
        <div className="shrink-0 p-2">
          <GameHUD />
        </div>

        {/* Main game area — stacks vertically on mobile, side-by-side on desktop */}
        <div className="flex-1 flex flex-col lg:flex-row gap-2 p-2 pt-0 min-h-0 overflow-y-auto lg:overflow-hidden">
          {/* 3D Orbital Viewer (primary) */}
          <div className="lg:w-[60%] flex flex-col gap-2 min-h-[300px] lg:min-h-0">
            <div className="flex-1 min-h-[250px] term-panel overflow-hidden relative">
              <BorderBeam color="var(--cyan)" duration={5} size={100} />
              <ScanLine color="var(--cyan)" speed={10} opacity={0.04} />
              <OrbitalViewer />
            </div>
            {/* Live electron config below 3D viewer */}
            <div className="shrink-0 term-panel">
              <ElectronConfig />
            </div>
          </div>

          {/* Sidebar: Energy Diagram + Periodic Strip + Quantum Info */}
          <div className="flex-1 flex flex-col gap-2 min-h-0">
            <div className="flex-1 overflow-hidden min-h-[200px]">
              <EnergyDiagram />
            </div>
            {mode === 'campaign' && (
              <div className="shrink-0">
                <TeachingTerminal />
              </div>
            )}
            <div className="shrink-0">
              <PeriodicStrip />
            </div>
            <div className="shrink-0">
              <QuantumInfo />
            </div>
          </div>
        </div>

        {/* Bottom: Electron Tray */}
        <div className="shrink-0 p-2 pt-0">
          <ElectronTray />
        </div>
      </div>

      {/* Overlays */}
      <ViolationToast showReveal={showReveal} onReveal={onReveal} />
      <LevelComplete />

      {/* Streak celebration */}
      <StreakFlame />

      {/* Keyboard shortcuts overlay (press ? to toggle) */}
      <KeyboardShortcuts />

      {/* Keyboard shortcuts hint — hidden on mobile */}
      <div className="fixed bottom-2 right-2 z-10 text-[9px] text-foreground/15 font-mono hidden sm:block">
        <span>U:↑ D:↓ ^Z:undo ?:help</span>
      </div>
    </DndContext>
  );
}
