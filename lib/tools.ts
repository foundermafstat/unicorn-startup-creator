// Add interface for tools
interface Tool {
    type: 'function';
    name: string;
    description: string;
    parameters?: {
      type: string;
      properties: Record<string, {
        type: string;
        description: string;
      }>;
    };
}

const toolDefinitions = {
    getCurrentTime: {
        description: 'Gets the current time in the user\'s timezone',
        parameters: {}
    },
    changeBackgroundColor: {
        description: 'Changes the background color of the page', 
        parameters: {
        color: { 
            type: 'string',
            description: 'Color value (hex, rgb, or color name)'
        }
        }
    },
    partyMode: {
        description: 'Triggers a confetti animation on the page',
        parameters: {}
    },
    launchWebsite: {
        description: 'Launches a website in the user\'s browser',
        parameters: {
        url: {
            type: 'string',
            description: 'The URL to launch'
        }
        }
    },
    copyToClipboard: {
        description: 'Copies text to the user\'s clipboard',
        parameters: {
        text: {
            type: 'string',
            description: 'The text to copy'
        }
        }
    },
    takeScreenshot: {
        description: 'Takes a screenshot of the current page',
        parameters: {}
    },
    scrapeWebsite: {
        description: 'Scrapes a URL and returns content in markdown and HTML formats',
        parameters: {
            url: {
                type: 'string',
                description: 'The URL to scrape'
            }
        }
    },
    navigateToPage: {
        description: 'Navigates to a specific page on the website',
        parameters: {
            page: {
                type: 'string',
                description: 'The page to navigate to (e.g., "home", "about", "features", "settings")'
            }
        }
    },
    nextSlide: {
        description: 'Moves to the next slide in a presentation',
        parameters: {}
    },
    previousSlide: {
        description: 'Moves to the previous slide in a presentation',
        parameters: {}
    },
    goToSlideNumber: {
        description: 'Jumps to a specific slide number in a presentation',
        parameters: {
            slideNumber: {
                type: 'number',
                description: 'The slide number to jump to (1-based index)'
            }
        }
    },
    firstSlide: {
        description: 'Moves to the first slide in a presentation',
        parameters: {}
    },
    lastSlide: {
        description: 'Moves to the last slide in a presentation',
        parameters: {}
    },
    togglePause: {
        description: 'Pauses or resumes a presentation',
        parameters: {}
    },
    toggleFullscreen: {
        description: 'Toggles fullscreen mode for a presentation',
        parameters: {}
    },
    exitPresentation: {
        description: 'Exits the current presentation mode',
        parameters: {}
    }
} as const;

const tools: Tool[] = Object.entries(toolDefinitions).map(([name, config]) => ({
    type: "function",
    name,
    description: config.description,
    parameters: {
    type: 'object',
    properties: config.parameters
    }
}));


export type { Tool };
export { tools };