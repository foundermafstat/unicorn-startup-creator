export const ru = {
    broadcast: {
        end: "Завершить трансляцию",
        live: "В эфире",
        start: "Начать трансляцию"
    },
    header: {
        title: "О проекте",
        about: "Это проект, демонстрирующий использование OpenAI Realtime API с WebRTC в современном Next.js 15 проекте. Установлены компоненты shadcn/ui и реализован хук для WebRTC аудио сессии. Клонируйте проект и определите свои собственные инструменты.",
        banner: "🎉 Ознакомьтесь с новой библиотекой OpenAI Realtime Blocks UI для Next.js!",
        bannerLink: "Узнать больше →",
        beta: "Бета",
        dark: "Темная",
        github: "Звезда на GitHub",
        language: "Язык",
        light: "Светлая",
        logo: "Unicorn Startup Creator",
        system: "Системная",
        theme: "Переключить тему",
        twitter: "Подписаться на",
        projectGenerator: "Генератор проектов"
    },
    projectGenerator: {
        title: "Генератор проектов",
        subtitle: "Создайте подробную документацию проекта на основе названия и описания",
        sections: {
            basicInfo: "Основная информация",
            basicInfoDescription: "Заполните название и описание проекта для генерации остальной информации",
            technicalDetailsDescription: "Архитектура, технологии, инфраструктура проекта",
            problemSolvedDescription: "Описание проблемы и способов её решения",
            businessModelDescription: "Монетизация, целевая аудитория, маркетинговая стратегия"
        },
        fields: {
            name: "Название проекта",
            shortDescription: "Краткое описание",
            technicalDetails: "Технические подробности",
            problemSolved: "Решаемая проблема",
            businessModel: "Бизнес модель"
        },
        placeholders: {
            projectName: "Введите название проекта...",
            projectDescription: "Опишите кратко суть проекта...",
            technicalDetails: "Технические подробности будут сгенерированы автоматически...",
            problemSolved: "Описание проблемы будет сгенерировано автоматически...",
            businessModel: "Бизнес модель будет сгенерирована автоматически..."
        },
        actions: {
            generateProject: "Сгенерировать проект",
            generating: "Генерируем проект..."
        },
        status: {
            generatingProject: "Генерируем проект...",
            generatingField: "Генерируем {field}..."
        },
        success: {
            projectGenerated: "Проект успешно сгенерирован!",
            projectGeneratedDescription: "Вся информация создана на основе ваших данных",
            contentRegenerated: "Контент перегенерирован!",
            contentRegeneratedDescription: "Поле '{field}' обновлено"
        },
        errors: {
            fillRequiredFields: "Заполните название и описание проекта",
            fillRequiredFieldsDescription: "Для генерации необходимо указать название и краткое описание",
            generationFailed: "Ошибка генерации",
            generationFailedDescription: "Не удалось сгенерировать информацию о проекте",
            regenerationFailed: "Ошибка перегенерации",
            regenerationFailedDescription: "Не удалось перегенерировать контент"
        }
    },
    hero: {
        badge: "Next.js + shadcn/ui",
        subtitle: "Демо: нажмите кнопку ниже и попробуйте доступные инструменты",
        title: "OpenAI Realtime API (WebRTC)"
    },
    messageControls: {
        content: "Содержание",
        filter: "Фильтр по типу",
        log: "Лог в консоль",
        logs: "Логи разговора",
        search: "Поиск сообщений...",
        type: "Тип",
        view: "Просмотр логов"
    },
    status: {
        error: "Упс!",
        info: "Переключение голосового помощника...",
        language: "Язык переключен с",
        session: "Сессия установлена",
        success: "Мы в эфире, детка!",
        toggle: "Переключение голосового помощника..."
    },
    tokenUsage: {
        input: "Входные токены",
        output: "Выходные токены",
        total: "Всего токенов",
        usage: "Использование токенов"
    },
    tools: {
        availableTools: {
            title: "Доступные инструменты",
            copyFn: {
                description: 'Скажите "Скопировать в буфер обмена" чтобы вставить куда-то.',
                name: "Функция копирования"
            },
            getTime: {
                description: 'Спросите "Сколько времени?" чтобы узнать текущее время.',
                name: "Получить время"
            },
            launchWebsite: {
                description: '"Отведи меня на [сайт]" чтобы открыть сайт в новой вкладке.',
                name: "Запустить сайт"
            },
            partyMode: {
                description: 'Скажите "Включить режим вечеринки" для динамической анимации конфетти!',
                name: "Режим вечеринки"
            },
            themeSwitcher: {
                description: 'Скажите "Сменить фон" или "Переключить на темный режим" или "Переключить на светлый режим".',
                name: "Переключатель темы"
            },
            scrapeWebsite: {
                name: "Скрапер сайтов",
                description: 'Скажите "Скрапить [URL сайта]" чтобы извлечь содержимое веб-страницы.'
            }
        },
        clipboard: {
            description: "Теперь вы можете вставить это куда-то.",
            success: "Текст скопирован в буфер обмена. Попросите пользователя вставить его куда-то.",
            toast: "Текст скопирован в буфер обмена!"
        },
        launchWebsite: {
            description: "Не удалось запустить сайт",
            success: "Сайт запущен! Скажите пользователю, что он был запущен.",
            toast: "Запуск сайта "
        },
        partyMode: {
            description: "Не удалось активировать режим вечеринки",
            success: "Режим вечеринки активирован",
            toast: "Режим вечеринки!",
            failed: "Не удалось активировать режим вечеринки",
        },
        switchTheme: "Тема переключена на ",
        themeFailed: "Не удалось переключить тему",
        time: "Сообщите пользователю: Текущее время ",
        scrapeWebsite: {
            success: "Содержимое сайта успешно извлечено",
            description: "Не удалось извлечь содержимое сайта",
            toast: "Скрапинг сайта..."
        }
    }
} 