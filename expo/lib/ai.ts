/**
 * Optional AI integration shim.
 *
 * The original Rork-generated app called `generateObject` from
 * `@rork-ai/toolkit-sdk`, a private package that only exists inside the
 * Rork platform and cannot be installed from npm. Importing it directly
 * breaks Metro bundling, so screens import this shim instead.
 *
 * AI-powered features (workout calorie estimation, food photo analysis)
 * are therefore disabled in this build and fail gracefully through each
 * screen's existing error handling. To enable them, replace the body of
 * `generateObject` with a call to your own AI backend (for example an API
 * route that forwards to an LLM provider) and return data matching the
 * zod schema the caller passes in.
 */

export const isAIAvailable = false;

type MessageContent =
  | string
  | { type: string; text?: string; image?: string }[];

export interface GenerateObjectOptions {
  messages: { role: string; content: MessageContent }[];
  schema: unknown;
}

export async function generateObject(_options: GenerateObjectOptions): Promise<any> {
  throw new Error(
    'AI analysis is not available in this build. Connect an AI provider in lib/ai.ts to enable this feature (see KNOWN_LIMITATIONS.md).'
  );
}
