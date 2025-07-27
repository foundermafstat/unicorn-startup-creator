"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  Sparkles, 
  RefreshCw, 
  FileText, 
  Code, 
  Target, 
  DollarSign,
  Loader2
} from "lucide-react"
import { toast } from "sonner"
import { useTranslations } from "@/components/translations-context"

interface ProjectData {
  name: string
  shortDescription: string
  technicalDetails: string
  problemSolved: string
  businessModel: string
}

export default function ProjectGeneratorPage() {
  const { t } = useTranslations()
  const [projectData, setProjectData] = useState<ProjectData>({
    name: "",
    shortDescription: "",
    technicalDetails: "",
    problemSolved: "",
    businessModel: ""
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [generatingField, setGeneratingField] = useState<string | null>(null)

  const updateField = (field: keyof ProjectData, value: string) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateContentWithOpenAI = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch('/api/generate-project-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      })

      if (!response.ok) {
        throw new Error('Failed to generate content')
      }

      const data = await response.json()
      return data.content
    } catch (error) {
      console.error('OpenAI API error:', error)
      throw error
    }
  }

  const generateProject = async () => {
    if (!projectData.name.trim() || !projectData.shortDescription.trim()) {
      toast.error(t('projectGenerator.errors.fillRequiredFields'), {
        description: t('projectGenerator.errors.fillRequiredFieldsDescription')
      })
      return
    }

    setIsGenerating(true)
    
    try {
      // Generate technical details
      setGeneratingField("technicalDetails")
      const technicalPrompt = `Based on the project "${projectData.name}" with description "${projectData.shortDescription}", create detailed technical specifications. Include: architecture, technologies, API, database, frontend/backend, deployment, scalability.`
      const technicalDetails = await generateContentWithOpenAI(technicalPrompt)
      updateField("technicalDetails", technicalDetails)

      // Generate problem solved
      setGeneratingField("problemSolved")
      const problemPrompt = `Based on the project "${projectData.name}" with description "${projectData.shortDescription}", describe the main problem this project solves. Include: current industry problems, how the project solves them, solution benefits.`
      const problemSolved = await generateContentWithOpenAI(problemPrompt)
      updateField("problemSolved", problemSolved)

      // Generate business model
      setGeneratingField("businessModel")
      const businessPrompt = `Based on the project "${projectData.name}" with description "${projectData.shortDescription}", create a detailed business model. Include: revenue streams, target audience, monetization, partnerships, marketing strategy, financial projections.`
      const businessModel = await generateContentWithOpenAI(businessPrompt)
      updateField("businessModel", businessModel)

      toast.success(t('projectGenerator.success.projectGenerated'), {
        description: t('projectGenerator.success.projectGeneratedDescription')
      })
    } catch (error) {
      toast.error(t('projectGenerator.errors.generationFailed'), {
        description: t('projectGenerator.errors.generationFailedDescription')
      })
    } finally {
      setIsGenerating(false)
      setGeneratingField(null)
    }
  }

  const regenerateField = async (field: keyof ProjectData) => {
    if (!projectData.name.trim() || !projectData.shortDescription.trim()) {
      toast.error(t('projectGenerator.errors.fillRequiredFields'), {
        description: t('projectGenerator.errors.fillRequiredFieldsDescription')
      })
      return
    }

    setGeneratingField(field)
    
    try {
      const prompts: Record<string, string> = {
        technicalDetails: `Based on the project "${projectData.name}" with description "${projectData.shortDescription}", create detailed technical specifications. Include: architecture, technologies, API, database, frontend/backend, deployment, scalability.`,
        problemSolved: `Based on the project "${projectData.name}" with description "${projectData.shortDescription}", describe the main problem this project solves. Include: current industry problems, how the project solves them, solution benefits.`,
        businessModel: `Based on the project "${projectData.name}" with description "${projectData.shortDescription}", create a detailed business model. Include: revenue streams, target audience, monetization, partnerships, marketing strategy, financial projections.`
      }

      const newContent = await generateContentWithOpenAI(prompts[field])
      updateField(field, newContent)

      toast.success(t('projectGenerator.success.contentRegenerated'), {
        description: t('projectGenerator.success.contentRegeneratedDescription').replace('{field}', getFieldLabel(field))
      })
    } catch (error) {
      toast.error(t('projectGenerator.errors.regenerationFailed'), {
        description: t('projectGenerator.errors.regenerationFailedDescription')
      })
    } finally {
      setGeneratingField(null)
    }
  }

  const getFieldLabel = (field: keyof ProjectData): string => {
    const labels = {
      name: t('projectGenerator.fields.name'),
      shortDescription: t('projectGenerator.fields.shortDescription'),
      technicalDetails: t('projectGenerator.fields.technicalDetails'),
      problemSolved: t('projectGenerator.fields.problemSolved'),
      businessModel: t('projectGenerator.fields.businessModel')
    }
    return labels[field]
  }

  const isFieldGenerating = (field: keyof ProjectData) => generatingField === field

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Sparkles className="h-10 w-10 text-primary" />
          {t('projectGenerator.title')}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t('projectGenerator.subtitle')}
        </p>
      </div>

      <div className="grid gap-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t('projectGenerator.sections.basicInfo')}
            </CardTitle>
            <CardDescription>
              {t('projectGenerator.sections.basicInfoDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="project-name">{t('projectGenerator.fields.name')} *</Label>
              <Input
                id="project-name"
                value={projectData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder={t('projectGenerator.placeholders.projectName')}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="project-description">{t('projectGenerator.fields.shortDescription')} *</Label>
              <Textarea
                id="project-description"
                value={projectData.shortDescription}
                onChange={(e) => updateField("shortDescription", e.target.value)}
                placeholder={t('projectGenerator.placeholders.projectDescription')}
                className="mt-1"
                rows={3}
              />
            </div>
            <Button 
              onClick={generateProject}
              disabled={isGenerating || !projectData.name.trim() || !projectData.shortDescription.trim()}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t('projectGenerator.actions.generating')}
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  {t('projectGenerator.actions.generateProject')}
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                <CardTitle>{t('projectGenerator.fields.technicalDetails')}</CardTitle>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => regenerateField("technicalDetails")}
                disabled={isFieldGenerating("technicalDetails")}
              >
                {isFieldGenerating("technicalDetails") ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>
            <CardDescription>
              {t('projectGenerator.sections.technicalDetailsDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={projectData.technicalDetails}
              onChange={(e) => updateField("technicalDetails", e.target.value)}
              placeholder={t('projectGenerator.placeholders.technicalDetails')}
              className="min-h-[300px] font-mono text-sm"
              disabled={isFieldGenerating("technicalDetails")}
            />
          </CardContent>
        </Card>

        {/* Problem Solved */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                <CardTitle>{t('projectGenerator.fields.problemSolved')}</CardTitle>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => regenerateField("problemSolved")}
                disabled={isFieldGenerating("problemSolved")}
              >
                {isFieldGenerating("problemSolved") ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>
            <CardDescription>
              {t('projectGenerator.sections.problemSolvedDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={projectData.problemSolved}
              onChange={(e) => updateField("problemSolved", e.target.value)}
              placeholder={t('projectGenerator.placeholders.problemSolved')}
              className="min-h-[300px]"
              disabled={isFieldGenerating("problemSolved")}
            />
          </CardContent>
        </Card>

        {/* Business Model */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                <CardTitle>{t('projectGenerator.fields.businessModel')}</CardTitle>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => regenerateField("businessModel")}
                disabled={isFieldGenerating("businessModel")}
              >
                {isFieldGenerating("businessModel") ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
            </div>
            <CardDescription>
              {t('projectGenerator.sections.businessModelDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={projectData.businessModel}
              onChange={(e) => updateField("businessModel", e.target.value)}
              placeholder={t('projectGenerator.placeholders.businessModel')}
              className="min-h-[300px]"
              disabled={isFieldGenerating("businessModel")}
            />
          </CardContent>
        </Card>
      </div>

      {/* Generation Status */}
      {isGenerating && (
        <div className="fixed bottom-4 right-4 bg-background border rounded-lg p-4 shadow-lg">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">
              {generatingField ? t('projectGenerator.status.generatingField').replace('{field}', getFieldLabel(generatingField as keyof ProjectData).toLowerCase()) : t('projectGenerator.status.generatingProject')}
            </span>
          </div>
        </div>
      )}
    </div>
  )
} 