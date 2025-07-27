"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { useTranslations } from "@/components/translations-context"


export function ToolsEducation() {
  const { t } = useTranslations();

  const AVAILABLE_TOOLS = [
    {
      name: t('tools.availableTools.copyFn.name'),
      description: t('tools.availableTools.copyFn.description'),
    },
    {
      name: t('tools.availableTools.getTime.name'),
      description: t('tools.availableTools.getTime.description'),
    },
    {
      name: t('tools.availableTools.themeSwitcher.name'),
      description: t('tools.availableTools.themeSwitcher.description'),
    },
    {
      name: t('tools.availableTools.partyMode.name'),
      description: t('tools.availableTools.partyMode.description'),
    },
    {
      name: t('tools.availableTools.launchWebsite.name'),
      description: t('tools.availableTools.launchWebsite.description'),
    },
    {
      name: t('tools.availableTools.scrapeWebsite.name'),
      description: t('tools.availableTools.scrapeWebsite.description'),
    },
    {
      name: "Voice Navigation",
      description: "Navigate between site pages using voice commands",
    },
    {
      name: "Presentation Control",
      description: "Control presentations using voice commands",
    },
    {
      name: "Project Information",
      description: "Get comprehensive information about the Unicorn Startup Creator project",
    },
    {
      name: "Detailed Project Info",
      description: "Get detailed information about specific project categories (developer, technology, features, etc.)",
    }
  ] as const;

  return (
    <div className="w-full mt-4">
      <Accordion type="single" collapsible className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg border-0 shadow-2xl">
        <AccordionItem value="tools">
          <AccordionTrigger>{t('tools.availableTools.title')}</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableBody>
                {AVAILABLE_TOOLS.map((tool) => (
                  <TableRow key={tool.name}>
                    <TableCell className="font-medium">{tool.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {tool.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
} 