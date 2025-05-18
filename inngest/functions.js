import { supabase } from "@/services/supabase";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { message: `Hello ${event.data.email}!` };
    },
);

export const llmModel = inngest.createFunction(
    { id: 'llm-model' },
    { event: 'llm-model' },
    async ({ event, step }) => {
        const aiResp = await step.ai.infer('generate-ai-llm-model-call', {
            model: step.ai.models.gemini({
                // model: 'gemini-2.0-flash-exp-image-generation',
                model: 'gemini-1.5-flash',
                apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY
            }),
            body: {
                contents: [
                    {
                        // role: 'system',
                        role: 'assistant',
                        parts: [
                            {
                                text: 'Depends on user input sources, Summarize and search about topic, Give me markdown text with proper formatting. User Input is:'
                                    + event.data.searchInput
                            }
                        ]
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: JSON.stringify(event.data.searchResult)
                            }
                        ]
                    }
                ]
            }
        })

        const saveToDb = await step.run('saveToDb', async () => {
            const { data, error } = await supabase
                .from('Chats')
                .update({
                    aiResp: aiResp?.candidates[0].content.parts[0].text
                })
                .eq('id', event.data.recordId)
                .select()
            if (error) {
                console.error('Supabase saveToDb() error:', error);
            }

            // console.log('aiResp: ', JSON.stringify(aiResp, null, 2))
            // console.log('event.data.recordId: ', event.data.recordId)
        })
        return aiResp;

    }
)
