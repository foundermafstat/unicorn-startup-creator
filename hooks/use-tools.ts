"use client"

import React from "react"
import { toast } from "sonner"
import confetti from 'canvas-confetti'
import { animate as framerAnimate } from "framer-motion"
import { useTranslations } from "@/components/translations-context"
import FirecrawlApp, { ScrapeResponse } from '@mendable/firecrawl-js';
import { useRouter } from "next/navigation"

// Global navigation function to avoid React hook issues in WebRTC context
let globalRouter: any = null;

export const setGlobalRouter = (router: any) => {
  globalRouter = router;
};

// Global presentation control functions
let globalPresentationControl: any = null;

export const setGlobalPresentationControl = (control: any) => {
  globalPresentationControl = control;
};

export const useToolsFunctions = () => {
  const { t } = useTranslations();
  const router = useRouter();
  
  // Set global router reference
  React.useEffect(() => {
    setGlobalRouter(router);
  }, [router]);

  const timeFunction = () => {
    const now = new Date()
    return {
      success: true,
      time: now.toLocaleTimeString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      message: t('tools.time') + now.toLocaleTimeString() + " в " + Intl.DateTimeFormat().resolvedOptions().timeZone + " часовом поясе."
    }
  }

  const backgroundFunction = () => {
    try {
      const html = document.documentElement;
      const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      html.classList.remove(currentTheme);
      html.classList.add(newTheme);

      toast(`Переключено на ${newTheme} режим! 🌓`, {
        description: t('tools.switchTheme') + newTheme + ".",
      })

      return { 
        success: true, 
        theme: newTheme,
        message: t('tools.switchTheme') + newTheme + "."
      };
    } catch (error) {
      return { 
        success: false, 
        message: t('tools.themeFailed') + ": " + error 
      };
    }
  }

  const partyFunction = () => {
    try {
      const duration = 5 * 1000
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1", "#3b82f6", "#14b8a6", "#f97316", "#10b981", "#facc15"]
      
      const confettiConfig = {
        particleCount: 30,
        spread: 100,
        startVelocity: 90,
        colors,
        gravity: 0.5
      }

      const shootConfetti = (angle: number, origin: { x: number, y: number }) => {
        confetti({
          ...confettiConfig,
          angle,
          origin
        })
      }

      const animate = () => {
        const now = Date.now()
        const end = now + duration
        
        const elements = document.querySelectorAll('div, p, button, h1, h2, h3')
        elements.forEach((element) => {
          framerAnimate(element, 
            { 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }, 
            { 
              duration: 0.5,
              repeat: 10,
              ease: "easeInOut"
            }
          )
        })

        const frame = () => {
          if (Date.now() > end) return
          shootConfetti(60, { x: 0, y: 0.5 })
          shootConfetti(120, { x: 1, y: 0.5 })
          requestAnimationFrame(frame)
        }

        const mainElement = document.querySelector('main')
        if (mainElement) {
          mainElement.classList.remove('bg-gradient-to-b', 'from-gray-50', 'to-white')
          const originalBg = mainElement.style.backgroundColor
          
          const changeColor = () => {
            const now = Date.now()
            const end = now + duration
            
            const colorCycle = () => {
              if (Date.now() > end) {
                framerAnimate(mainElement, 
                  { backgroundColor: originalBg },
                  { duration: 0.5 }
                )
                return
              }
              const newColor = colors[Math.floor(Math.random() * colors.length)]
              framerAnimate(mainElement,
                { backgroundColor: newColor },
                { duration: 0.2 }
              )
              setTimeout(colorCycle, 200)
            }
            
            colorCycle()
          }
          
          changeColor()
        }
        
        frame()
      }

      animate()
      toast.success(t('tools.partyMode.toast') + " 🎉", {
        description: t('tools.partyMode.description'),
      })
      return { success: true, message: t('tools.partyMode.success') + " 🎉" }
    } catch (error) {
      return { success: false, message: t('tools.partyMode.failed') + ": " + error }
    }
  }

  const launchWebsite = ({ url }: { url: string }) => {
    window.open(url, '_blank')
    toast(t('tools.launchWebsite') + " 🌐", {
      description: t('tools.launchWebsiteSuccess') + url + ", сообщите пользователю, что сайт запущен.",
    })
    return {
      success: true,
      message: `Сайт ${url} запущен, сообщите пользователю, что сайт запущен.`
    }
  }

  const copyToClipboard = ({ text }: { text: string }) => {
    navigator.clipboard.writeText(text)
    toast(t('tools.clipboard.toast') + " 📋", {
      description: t('tools.clipboard.description'),
    })
    return {
      success: true,
      text,
      message: t('tools.clipboard.success')
    }
  }

  const scrapeWebsite = async ({ url }: { url: string }) => {
    const apiKey = process.env.NEXT_PUBLIC_FIRECRAWL_API_KEY;
    try {
      const app = new FirecrawlApp({ apiKey: apiKey });
      const scrapeResult = await app.scrapeUrl(url, { formats: ['markdown', 'html'] }) as ScrapeResponse;

      if (!scrapeResult.success) {
        console.log(scrapeResult.error)
        return {
          success: false,
          message: `Не удалось скрапить: ${scrapeResult.error}`
        };
      }

      toast.success(t('tools.scrapeWebsite.toast') + " 📋", {
        description: t('tools.scrapeWebsite.success'),
      })
    
      return {
        success: true,
        message: "Вот содержимое скраппированного сайта: " + JSON.stringify(scrapeResult.markdown) + "Суммируйте и объясните его пользователю сейчас в ответе."
      };

    } catch (error) {
      return {
        success: false,
        message: `Ошибка скрапинга сайта: ${error}`
      };
    }
  }

  const navigateToPage = ({ page }: { page: string }) => {
    console.log('navigateToPage called with:', page);
    console.log('Current router state:', router);
    
    const pageMap: Record<string, string> = {
      // Home page
      'home': '/',
      'main': '/',
      'main page': '/',
      'start': '/',
      'beginning': '/',
      
      // About page
      'about': '/about',
      'about page': '/about',
      'project': '/about',
      'information': '/about',
      'info': '/about',
      
      // Features page
      'features': '/features',
      'capabilities': '/features',
      'functions': '/features',
      'abilities': '/features',
      
      // Settings page
      'settings': '/settings',
      'configuration': '/settings',
      'parameters': '/settings',
      'options': '/settings',
      'preferences': '/settings',
      
      // Presentations page
      'presentations': '/presentations',
      'presentation': '/presentations',
      'slides': '/presentations',
      'slide show': '/presentations'
    };

    const normalizedPage = page.toLowerCase().trim();
    const targetPath = pageMap[normalizedPage];

    console.log('Navigation attempt:', { originalPage: page, normalizedPage, targetPath, currentPath: window.location.pathname });

    if (!targetPath) {
      const availablePages = Object.keys(pageMap).slice(0, 8).join(', ');
      toast.error("Страница не найдена", {
        description: `Страница "${page}" не существует. Доступные страницы: ${availablePages}.`,
      });
      return {
        success: false,
        message: `Страница "${page}" не найдена. Доступные страницы: ${availablePages}.`
      };
    }

    try {
      toast.success("Навигация завершена", {
        description: `Навигация к странице "${page}"`,
      });
      
      // Small delay to ensure toast is shown
      setTimeout(() => {
        console.log('Executing navigation to:', targetPath);
        console.log('Global router available:', !!globalRouter);
        console.log('Local router available:', !!router);
        
        // Try global router first (for WebRTC context)
        if (globalRouter && typeof globalRouter.push === 'function') {
          try {
            globalRouter.push(targetPath);
            console.log('Navigation executed successfully with global router');
            return;
          } catch (navError) {
            console.error('Global router navigation failed:', navError);
          }
        }
        
        // Try local router as fallback
        if (router && typeof router.push === 'function') {
          try {
            router.push(targetPath);
            console.log('Navigation executed successfully with local router');
            return;
          } catch (navError) {
            console.error('Local router navigation failed:', navError);
          }
        }
        
        // Final fallback to window.location
        console.log('Using window.location fallback');
        window.location.href = targetPath;
      }, 500);
      
      const result = {
        success: true,
        page: page,
        path: targetPath,
        message: `Успешно навигация к странице "${page}". ${targetPath === '/' ? 'Это главная страница сайта.' : 'Страница загружена.'}`
      };
      
      console.log('Navigation result:', result);
      return result;
    } catch (error) {
      console.error('Navigation error:', error);
      return {
        success: false,
        message: `Ошибка навигации к странице "${page}": ${error}`
      };
    }
  }

  // Presentation control functions
  const nextSlide = () => {
    console.log('nextSlide called');
    if (globalPresentationControl?.nextSlide) {
      globalPresentationControl.nextSlide();
      toast.success("Следующий слайд", {
        description: "Переход к следующему слайду",
        duration: 2000,
      });
    } else {
      toast.error("Презентация недоступна", {
        description: "Активная презентация не найдена",
        duration: 3000,
      });
    }
    
    return {
      success: true,
      message: "Переход к следующему слайду"
    };
  };

  const previousSlide = () => {
    console.log('previousSlide called');
    if (globalPresentationControl?.previousSlide) {
      globalPresentationControl.previousSlide();
      toast.success("Предыдущий слайд", {
        description: "Переход к предыдущему слайду",
        duration: 2000,
      });
    } else {
      toast.error("Презентация недоступна", {
        description: "Активная презентация не найдена",
        duration: 3000,
      });
    }
    
    return {
      success: true,
      message: "Переход к предыдущему слайду"
    };
  };

  const goToSlideNumber = ({ slideNumber }: { slideNumber: number }) => {
    console.log('goToSlideNumber called with:', slideNumber);
    
    if (globalPresentationControl?.goToSlide) {
      globalPresentationControl.goToSlide(slideNumber);
      toast.success(`Слайд ${slideNumber}`, {
        description: `Переход на слайд ${slideNumber}`,
        duration: 2000,
      });
    } else {
      toast.error("Презентация недоступна", {
        description: "Активная презентация не найдена",
        duration: 3000,
      });
    }
    
    return {
      success: true,
      message: `Переход на слайд ${slideNumber}`
    };
  };

  const firstSlide = () => {
    console.log('firstSlide called');
    if (globalPresentationControl?.goToFirst) {
      globalPresentationControl.goToFirst();
      toast.success("Первый слайд", {
        description: "Переход к первому слайду",
        duration: 2000,
      });
    } else {
      toast.error("Презентация недоступна", {
        description: "Активная презентация не найдена",
        duration: 3000,
      });
    }
    
    return {
      success: true,
      message: "Переход к первому слайду"
    };
  };

  const lastSlide = () => {
    console.log('lastSlide called');
    if (globalPresentationControl?.goToLast) {
      globalPresentationControl.goToLast();
      toast.success("Последний слайд", {
        description: "Переход к последнему слайду",
        duration: 2000,
      });
    } else {
      toast.error("Презентация недоступна", {
        description: "Активная презентация не найдена",
        duration: 3000,
      });
    }
    
    return {
      success: true,
      message: "Переход к последнему слайду"
    };
  };

  const togglePause = () => {
    console.log('togglePause called');
    if (globalPresentationControl?.togglePause) {
      globalPresentationControl.togglePause();
      toast.success("Управление презентацией", {
        description: "Переключено пауза/возобновление",
        duration: 2000,
      });
    } else {
      toast.error("Презентация недоступна", {
        description: "Активная презентация не найдена",
        duration: 3000,
      });
    }
    
    return {
      success: true,
      message: "Переключено управление презентацией"
    };
  };

  const toggleFullscreen = () => {
    console.log('toggleFullscreen called');
    if (globalPresentationControl?.toggleFullscreen) {
      globalPresentationControl.toggleFullscreen();
      toast.success("Полноэкранный режим", {
        description: "Переключено полноэкранный режим",
        duration: 2000,
      });
    } else {
      toast.error("Презентация недоступна", {
        description: "Активная презентация не найдена",
        duration: 3000,
      });
    }
    
    return {
      success: true,
      message: "Переключено полноэкранный режим"
    };
  };

  const exitPresentation = () => {
    console.log('exitPresentation called');
    if (globalPresentationControl?.exitPresentation) {
      globalPresentationControl.exitPresentation();
      toast.success("Выход из презентации", {
        description: "Выход из режима презентации",
        duration: 2000,
      });
    } else {
      toast.error("Презентация недоступна", {
        description: "Активная презентация не найдена",
        duration: 3000,
      });
    }
    return { success: true, message: "Выход из презентации" };
  };

  const narrateSlide = () => {
    console.log('narrateSlide called');
    if (globalPresentationControl?.narrateSlide) {
      // Получаем текущий слайд из глобального состояния и конвертируем в номер слайда
      const currentSlideIndex = globalPresentationControl.currentSlide || 0;
      const currentSlideNumber = currentSlideIndex + 1; // Конвертируем индекс в номер слайда
      globalPresentationControl.narrateSlide(currentSlideNumber);
      toast.success("Озвучивание слайда", {
        description: `Озвучивается слайд ${currentSlideNumber}`,
        duration: 2000,
      });
    } else {
      toast.error("Презентация недоступна", {
        description: "Активная презентация не найдена",
        duration: 3000,
      });
    }
    return { success: true, message: "Озвучивание слайда" };
  };

  return {
    timeFunction,
    backgroundFunction,
    partyFunction,
    launchWebsite,
    copyToClipboard,
    scrapeWebsite,
    navigateToPage,
    nextSlide,
    previousSlide,
    goToSlideNumber,
    firstSlide,
    lastSlide,
    togglePause,
    toggleFullscreen,
    exitPresentation,
    narrateSlide
  };
}