import OpenAI from 'openai';
import { AiStructuredResponse } from './types';
import { validateAiResponse } from './validator';
import { CircuitProject } from '../model/types';

export class AiService {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async requestEdit(userPrompt: string, project: CircuitProject): Promise<AiStructuredResponse> {
    const prompt = `You are a schematic editing assistant. Return JSON only with mode=edit_operations for incremental edits whenever possible. Current project: ${JSON.stringify(project)}. User: ${userPrompt}`;
    const res = await this.client.responses.create({
      model: 'gpt-4.1-mini',
      input: prompt,
      text: { format: { type: 'json_object' } }
    });
    const text = res.output_text;
    const parsed = JSON.parse(text) as AiStructuredResponse;
    const validation = validateAiResponse(parsed);
    if (!validation.valid) throw new Error(`AI response invalid: ${validation.errors.join(', ')}`);
    return parsed;
  }
}
