  import Groq from "groq-sdk";

  const groq = new Groq({ apiKey:'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',
  dangerouslyAllowBrowser: true 
});
  
  export async function extractKeyTerms(content) {
    const chatCompletion = await getGroqChatCompletion(content);
    return chatCompletion.choices[0]?.message?.content || ""
  }
  
  export async function getGroqChatCompletion(content) {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Indentify the most important(only important term not scuh 'name', 'is' ,'am' , 'are' etc if there) terms(e.g. 10 terms/100 words) and provide brief descriptions (max 1 sentences) for each in a JSON format. Response should include only json data(strictly should not include like 'here is the json data' etc. just give correct json data as in key valye pair not any other data and consider provided content is the content of note in note-pplication,output format must be like this-"[
            {
              term: 'importand term 1',
              description:'brief descriprion of term 1',
            },
            {
              term: 'importand term 2',
              description:'brief descriprion of term 2',
            },
          ]" from this data only - ${content}`,
        },
      ],
      model: "llama-3.1-70b-versatile",
  });
}

export async function getSummary(content) {
  const chatCompletion = await getSummarizeContent(content);
  return chatCompletion.choices[0]?.message?.content || ""
}
export async function getSummarizeContent(content){
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Summarize it without altering the original content or grammar ,- ${content}`,
      },
    ],
    model: "llama-3.1-70b-versatile",
  });
}