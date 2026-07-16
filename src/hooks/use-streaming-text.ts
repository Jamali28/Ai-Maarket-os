"use client";

import { useState, useCallback, useRef } from "react";
import type { GenerationType, GenerationStreamEvent } from "@/types";

interface StreamState {
  contents: Record<string, string>;
  isStreaming: boolean;
  errors: string[];
  completed: string[];
}

export function useStreamingText() {
  const [state, setState] = useState<StreamState>({
    contents: {},
    isStreaming: false,
    errors: [],
    completed: [],
  });
  const abortRef = useRef<AbortController | null>(null);

  const startStream = useCallback(
    async (productId: string, types: GenerationType[], variant: string) => {
      abortRef.current = new AbortController();
      setState({ contents: {}, isStreaming: true, errors: [], completed: [] });

      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, types, variant }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) {
          throw new Error(`Generation failed: ${res.statusText}`);
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No response stream");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              try {
                const event: GenerationStreamEvent = JSON.parse(line.slice(6));
                if (event.token) {
                  setState((prev) => ({
                    ...prev,
                    contents: {
                      ...prev.contents,
                      [event.type]: (prev.contents[event.type] || "") + event.token,
                    },
                  }));
                }
                if (event.done) {
                  setState((prev) => ({
                    ...prev,
                    completed: [...prev.completed, event.type],
                  }));
                }
                if (event.error) {
                  setState((prev) => ({
                    ...prev,
                    errors: [...prev.errors, event.error!],
                  }));
                }
              } catch {
                // skip parse errors
              }
            }
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setState((prev) => ({
            ...prev,
            errors: [...prev.errors, err.message],
          }));
        }
      } finally {
        setState((prev) => ({ ...prev, isStreaming: false }));
      }
    },
    []
  );

  const cancelStream = useCallback(() => {
    abortRef.current?.abort();
    setState((prev) => ({ ...prev, isStreaming: false }));
  }, []);

  const reset = useCallback(() => {
    setState({ contents: {}, isStreaming: false, errors: [], completed: [] });
  }, []);

  return { ...state, startStream, cancelStream, reset };
}
