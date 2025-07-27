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
  Loader2,
  Zap,
  Brain,
  Rocket,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { toast } from "sonner"
import { useTranslations } from "@/components/translations-context"
import { motion, AnimatePresence } from "framer-motion"

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

      toast.success(t('projectGenerator.success.generationComplete'), {
        description: t('projectGenerator.success.generationCompleteDescription')
      })
    } catch (error) {
      console.error('Generation error:', error)
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
      const prompts: Record<keyof ProjectData, string> = {
        name: "",
        shortDescription: "",
        technicalDetails: `Based on the project "${projectData.name}" with description "${projectData.shortDescription}", create detailed technical specifications. Include: architecture, technologies, API, database, frontend/backend, deployment, scalability.`,
        problemSolved: `Based on the project "${projectData.name}" with description "${projectData.shortDescription}", describe the main problem this project solves. Include: current industry problems, how the project solves them, solution benefits.`,
        businessModel: `Based on the project "${projectData.name}" with description "${projectData.shortDescription}", create a detailed business model. Include: revenue streams, target audience, monetization, partnerships, marketing strategy, financial projections.`
      }

      const content = await generateContentWithOpenAI(prompts[field])
      updateField(field, content)
      
      toast.success(t('projectGenerator.success.fieldRegenerated'), {
        description: t('projectGenerator.success.fieldRegeneratedDescription')
      })
    } catch (error) {
      console.error('Regeneration error:', error)
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

  const isFieldComplete = (field: keyof ProjectData) => projectData[field].trim().length > 0

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 py-8">
        {/* Header Section */}
        <motion.div 
          className="max-w-7xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {t('projectGenerator.title')}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('projectGenerator.subtitle')}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span>AI-Powered Generation</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Real-time Processing</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
              <div className="flex items-center gap-2">
                <Rocket className="h-4 w-4" />
                <span>Startup Focused</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Basic Information */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="sticky top-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <FileText className="h-6 w-6 text-blue-600" />
                    {t('projectGenerator.sections.basicInfo')}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {t('projectGenerator.sections.basicInfoDescription')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="project-name" className="text-sm font-medium">
                      {t('projectGenerator.fields.name')} *
                    </Label>
                    <Input
                      id="project-name"
                      value={projectData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder={t('projectGenerator.placeholders.projectName')}
                      className="h-12 text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project-description" className="text-sm font-medium">
                      {t('projectGenerator.fields.shortDescription')} *
                    </Label>
                    <Textarea
                      id="project-description"
                      value={projectData.shortDescription}
                      onChange={(e) => updateField("shortDescription", e.target.value)}
                      placeholder={t('projectGenerator.placeholders.projectDescription')}
                      className="min-h-[120px] text-base resize-none"
                      rows={4}
                    />
                  </div>
                  <Button 
                    onClick={generateProject}
                    disabled={isGenerating || !projectData.name.trim() || !projectData.shortDescription.trim()}
                    className="w-full h-12 text-base font-medium bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        {t('projectGenerator.actions.generating')}
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        {t('projectGenerator.actions.generateProject')}
                      </>
                    )}
                  </Button>
                  
                  {/* Progress Indicator */}
                  <AnimatePresence>
                    {isGenerating && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3"
                      >
                        <div className="text-sm font-medium text-muted-foreground">Generation Progress:</div>
                        {['technicalDetails', 'problemSolved', 'businessModel'].map((field) => (
                          <div key={field} className="flex items-center gap-2">
                            {isFieldGenerating(field as keyof ProjectData) ? (
                              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                            ) : isFieldComplete(field as keyof ProjectData) ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                            )}
                            <span className="text-sm text-muted-foreground">
                              {getFieldLabel(field as keyof ProjectData)}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column - Generated Content */}
            <motion.div 
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Technical Details */}
              <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                        <Code className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{t('projectGenerator.fields.technicalDetails')}</CardTitle>
                        <CardDescription className="text-base">
                          {t('projectGenerator.sections.technicalDetailsDescription')}
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => regenerateField("technicalDetails")}
                      disabled={isFieldGenerating("technicalDetails")}
                      className="h-9 px-3"
                    >
                      {isFieldGenerating("technicalDetails") ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={projectData.technicalDetails}
                    onChange={(e) => updateField("technicalDetails", e.target.value)}
                    placeholder={t('projectGenerator.placeholders.technicalDetails')}
                    className="min-h-[400px] font-mono text-sm border-0 bg-transparent resize-none focus:ring-0"
                    disabled={isFieldGenerating("technicalDetails")}
                  />
                </CardContent>
              </Card>

              {/* Problem Solved */}
              <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                        <Target className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{t('projectGenerator.fields.problemSolved')}</CardTitle>
                        <CardDescription className="text-base">
                          {t('projectGenerator.sections.problemSolvedDescription')}
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => regenerateField("problemSolved")}
                      disabled={isFieldGenerating("problemSolved")}
                      className="h-9 px-3"
                    >
                      {isFieldGenerating("problemSolved") ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={projectData.problemSolved}
                    onChange={(e) => updateField("problemSolved", e.target.value)}
                    placeholder={t('projectGenerator.placeholders.problemSolved')}
                    className="min-h-[400px] text-base border-0 bg-transparent resize-none focus:ring-0"
                    disabled={isFieldGenerating("problemSolved")}
                  />
                </CardContent>
              </Card>

              {/* Business Model */}
              <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                        <DollarSign className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{t('projectGenerator.fields.businessModel')}</CardTitle>
                        <CardDescription className="text-base">
                          {t('projectGenerator.sections.businessModelDescription')}
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => regenerateField("businessModel")}
                      disabled={isFieldGenerating("businessModel")}
                      className="h-9 px-3"
                    >
                      {isFieldGenerating("businessModel") ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={projectData.businessModel}
                    onChange={(e) => updateField("businessModel", e.target.value)}
                    placeholder={t('projectGenerator.placeholders.businessModel')}
                    className="min-h-[400px] text-base border-0 bg-transparent resize-none focus:ring-0"
                    disabled={isFieldGenerating("businessModel")}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Floating Status Indicator */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-6 right-6 bg-white dark:bg-slate-900 border rounded-xl p-4 shadow-2xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {generatingField ? `Generating ${getFieldLabel(generatingField as keyof ProjectData).toLowerCase()}...` : 'Generating project...'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    This may take a few moments
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
} 