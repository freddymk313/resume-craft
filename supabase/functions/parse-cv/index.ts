import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "No text provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert CV/resume parser. You receive raw text extracted from a CV/resume document. Your job is to extract ALL structured information and return it as JSON.

You MUST use the tool "extract_resume_data" to return the structured data. Do not return plain text.

Rules:
- Extract the first name and last name separately from the contact/header section.
- Extract job title, email, phone, location, website, and LinkedIn URL.
- Extract every work experience entry with company, position, location, start date (YYYY-MM format), end date (YYYY-MM format or empty if current), whether it's a current job, and description (bullet points joined by newlines).
- Extract every education entry with school, degree, location, start date, and end date.
- Extract skills as an array of individual skill strings.
- Extract languages as an array of individual language strings (e.g. "French (Native)").
- Extract certifications as an array of individual certification strings.
- Extract a professional summary if present.
- If a field is not found, use an empty string for strings or empty array for arrays.
- For dates, try to convert to YYYY-MM format. If only a year is given, use YYYY-01.
- Generate unique IDs for experience and education entries (use simple numbers like "1", "2", etc.)`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Here is the raw text extracted from a CV:\n\n${text}` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "extract_resume_data",
              description: "Extract structured resume data from CV text",
              parameters: {
                type: "object",
                properties: {
                  personalInfo: {
                    type: "object",
                    properties: {
                      firstName: { type: "string" },
                      lastName: { type: "string" },
                      jobTitle: { type: "string" },
                      email: { type: "string" },
                      phone: { type: "string" },
                      location: { type: "string" },
                      website: { type: "string" },
                      linkedin: { type: "string" },
                    },
                    required: ["firstName", "lastName", "jobTitle", "email", "phone", "location", "website", "linkedin"],
                    additionalProperties: false,
                  },
                  summary: { type: "string" },
                  experience: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        company: { type: "string" },
                        position: { type: "string" },
                        location: { type: "string" },
                        startDate: { type: "string" },
                        endDate: { type: "string" },
                        currentJob: { type: "boolean" },
                        description: { type: "string" },
                      },
                      required: ["id", "company", "position", "location", "startDate", "endDate", "currentJob", "description"],
                      additionalProperties: false,
                    },
                  },
                  education: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        school: { type: "string" },
                        degree: { type: "string" },
                        location: { type: "string" },
                        startDate: { type: "string" },
                        endDate: { type: "string" },
                      },
                      required: ["id", "school", "degree", "location", "startDate", "endDate"],
                      additionalProperties: false,
                    },
                  },
                  skills: { type: "array", items: { type: "string" } },
                  languages: { type: "array", items: { type: "string" } },
                  certifications: { type: "array", items: { type: "string" } },
                },
                required: ["personalInfo", "summary", "experience", "education", "skills", "languages", "certifications"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "extract_resume_data" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const result = await response.json();
    const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall?.function?.arguments) {
      throw new Error("AI did not return structured data");
    }

    const parsedData = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ data: parsedData }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("parse-cv error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
