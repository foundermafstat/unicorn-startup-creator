export const en = {
    broadcast: {
        end: "End Broadcasting",
        live: "Live",
        start: "Start Broadcasting"
    },
    header: {
        title: "About",
        about: "This is a project that aims to demonstrate how to use OpenAI Realtime API with WebRTC in a modern Next 15 project. It has shadcn/ui components already installed and the WebRTC audio session hook already implemented. Clone the project and define your own tools.",
        banner: "🎉 Check out the new OpenAI Realtime Blocks UI Library for Next.js!",
        bannerLink: "Learn more →",
        beta: "Beta",
        dark: "Dark",
        github: "Star on GitHub",
        language: "Language",
        light: "Light",
        logo: "Unicorn Startup Creator",
        system: "System",
        theme: "Toggle theme",
        twitter: "Follow on",
        projectGenerator: "Project Generator"
    },
    projectGenerator: {
        title: "Project Generator",
        subtitle: "Create detailed project documentation based on name and description",
        sections: {
            basicInfo: "Basic Information",
            basicInfoDescription: "Fill in the project name and description to generate the rest of the information",
            technicalDetailsDescription: "Architecture, technologies, project infrastructure",
            problemSolvedDescription: "Problem description and solution methods",
            businessModelDescription: "Monetization, target audience, marketing strategy"
        },
        fields: {
            name: "Project Name",
            shortDescription: "Short Description",
            technicalDetails: "Technical Details",
            problemSolved: "Problem Solved",
            businessModel: "Business Model"
        },
        placeholders: {
            projectName: "Enter project name...",
            projectDescription: "Briefly describe the project essence...",
            technicalDetails: "Technical details will be generated automatically...",
            problemSolved: "Problem description will be generated automatically...",
            businessModel: "Business model will be generated automatically..."
        },
        actions: {
            generateProject: "Generate Project",
            generating: "Generating project..."
        },
        status: {
            generatingProject: "Generating project...",
            generatingField: "Generating {field}..."
        },
        success: {
            projectGenerated: "Project generated successfully!",
            projectGeneratedDescription: "All information created based on your data",
            contentRegenerated: "Content regenerated!",
            contentRegeneratedDescription: "Field '{field}' updated"
        },
        errors: {
            fillRequiredFields: "Fill in project name and description",
            fillRequiredFieldsDescription: "Name and short description are required for generation",
            generationFailed: "Generation failed",
            generationFailedDescription: "Failed to generate project information",
            regenerationFailed: "Regeneration failed",
            regenerationFailedDescription: "Failed to regenerate content"
        }
    },
    hero: {
        badge: "Next.js + shadcn/ui",
        subtitle: "Demo by clicking the button below and try available tools",
        title: "OpenAI Realtime API (WebRTC)"
    },
    messageControls: {
        content: "Content",
        filter: "Filter by type",
        log: "Log to Console",
        logs: "Conversation Logs",
        search: "Search messages...",
        type: "Type",
        view: "View Logs"
    },
    status: {
        error: "Whoops!",
        info: "Toggling Voice Assistant...",
        language: "Language switched from",
        session: "Session established",
        success: "We're live, baby!",
        toggle: "Toggling Voice Assistant..."
    },
    tokenUsage: {
        input: "Input Tokens",
        output: "Output Tokens",
        total: "Total Tokens",
        usage: "Token Usage"
    },
    tools: {
        availableTools: {
            title: "Available Tools",
            copyFn: {
                description: 'Say "Copy that to clipboard" to paste it somewhere.',
                name: "Copy Fn"
            },
            getTime: {
                description: 'Ask "Tell me what time is it?" to get current time.',
                name: "Get Time"
            },
            launchWebsite: {
                description: '"Take me to [website]" to launch a site in a new tab.',
                name: "Launch Website"
            },
            partyMode: {
                description: 'Say "Start party mode" for a dynamic confetti animation!',
                name: "Party Mode"
            },
            themeSwitcher: {
                description: 'Say "Change background" or "Switch to dark mode" or "Switch to light mode".',
                name: "Theme Switcher"
            },
            scrapeWebsite: {
                name: "Website Scraper",
                description: 'Say "Scrape [website URL]" to extract content from a webpage.'
            }
        },
        clipboard: {
            description: "You can now paste it somewhere.",
            success: "Text copied to clipboard. Ask the user to paste it somewhere.",
            toast: "Text copied to clipboard!"
        },
        launchWebsite: {
            description: "Failed to launch website",
            success: "Launched the site! Tell the user it's been launched.",
            toast: "Launching website "
        },
        partyMode: {
            description: "Failed to activate party mode",
            success: "Party mode activated",
            toast: "Party mode!",
            failed: "Failed to activate party mode",
        },
        switchTheme: "Theme switched to ",
        themeFailed: "Failed to switch theme",
        time: "Announce to user: The current time is ",
        scrapeWebsite: {
            success: "Website content extracted successfully",
            description: "Failed to scrape website content",
            toast: "Scraping website..."
        }
    },
    transcriber: {
        title: "Live Transcript"
    },
    voice: {
        select: "Select a voice",
        ash: "Ash - Gentle & Professional",
        ballad: "Ballad - Warm & Engaging",
        coral: "Coral - Clear & Friendly",
        sage: "Sage - Authoritative & Calm",
        verse: "Verse - Dynamic & Expressive"
    },
    language: "English",
    languagePrompt: "Speak and respond only in English. It is crucial that you maintain your responses in English. If the user speaks in other languages, you should still respond in English."
}