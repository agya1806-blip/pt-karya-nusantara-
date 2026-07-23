"use client";

import { useState, useCallback } from "react";
import { Ruler, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

interface RoomInput {
  id: string;
  name: string;
  width: number;
  length: number;
  count: number;
}

interface BuildingAreaCalculatorProps {
  onAreaCalculated: (totalArea: number) => void;
  initialRooms?: RoomInput[];
}

export function BuildingAreaCalculator({ onAreaCalculated, initialRooms }: BuildingAreaCalculatorProps) {
  const [rooms, setRooms] = useState<RoomInput[]>(initialRooms || [
    { id: "1", name: "Living Room", width: 8, length: 6, count: 1 },
  ]);

  const addRoom = useCallback(() => {
    const id = String(Date.now());
    setRooms((prev) => [...prev, { id, name: "", width: 0, length: 0, count: 1 }]);
  }, []);

  const removeRoom = useCallback((id: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const updateRoom = useCallback((id: string, field: keyof RoomInput, value: string | number) => {
    setRooms((prev) => prev.map((r) => r.id === id ? { ...r, [field]: typeof value === "string" ? value : Math.max(0, value) } : r));
  }, []);

  const totalArea = rooms.reduce((sum, r) => sum + r.width * r.length * r.count, 0);
  const handleCalculate = () => onAreaCalculated(totalArea);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Ruler className="h-5 w-5 text-text-secondary" />
        <Heading as="h3" size="md" weight="light">Building Area Calculator</Heading>
      </div>

      <div className="space-y-4">
        {rooms.map((room, i) => (
          <div key={room.id} className="flex items-end gap-3 pb-4 border-b border-border last:border-0">
            <div className="flex-1">
              <label className="mb-1 block text-body-xs text-text-muted">Room Name</label>
              <Input
                value={room.name}
                onChange={(e) => updateRoom(room.id, "name", e.target.value)}
                placeholder={`Room ${i + 1}`}
                className="py-2 text-body-sm"
              />
            </div>
            <div className="w-20">
              <label className="mb-1 block text-body-xs text-text-muted">Width (m)</label>
              <Input
                type="number"
                value={room.width || ""}
                onChange={(e) => updateRoom(room.id, "width", Number(e.target.value))}
                min={0}
                step={0.5}
                className="py-2 text-body-sm"
              />
            </div>
            <div className="w-20">
              <label className="mb-1 block text-body-xs text-text-muted">Length (m)</label>
              <Input
                type="number"
                value={room.length || ""}
                onChange={(e) => updateRoom(room.id, "length", Number(e.target.value))}
                min={0}
                step={0.5}
                className="py-2 text-body-sm"
              />
            </div>
            <div className="w-20">
              <label className="mb-1 block text-body-xs text-text-muted">Floors</label>
              <Input
                type="number"
                value={room.count || ""}
                onChange={(e) => updateRoom(room.id, "count", Number(e.target.value))}
                min={1}
                className="py-2 text-body-sm"
              />
            </div>
            <div className="flex items-center gap-2 pb-1">
              <span className="text-body-sm text-text-muted">
                {(room.width * room.length * room.count).toLocaleString()} m²
              </span>
              {rooms.length > 1 && (
                <button
                  onClick={() => removeRoom(room.id)}
                  className="p-1 text-text-muted hover:text-red-500 transition-colors"
                  aria-label="Remove room"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <Button variant="ghost" size="sm" onClick={addRoom}>
          <Plus className="h-4 w-4 mr-2" /> Add Room
        </Button>
        <div className="text-right">
          <Text size="sm" color="muted">Total Area</Text>
          <span className="text-display-xs font-light text-text">{totalArea.toLocaleString()} m²</span>
        </div>
      </div>

      {totalArea > 0 && (
        <Button onClick={handleCalculate} variant="primary" className="w-full">
          Use This Area for Estimation
        </Button>
      )}
    </div>
  );
}
