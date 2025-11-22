// Simple translation utility using Google Translate API or LibreTranslate
// For production, you should use a proper translation service

const LIBRE_TRANSLATE_API = 'https://libretranslate.com/translate';

export const languages = {
  english: 'en',
  amharic: 'am',
  arabic: 'ar',
  french: 'fr',
  chinese: 'zh'
};

export const languageNames = {
  english: 'English',
  amharic: 'አማርኛ (Amharic)',
  arabic: 'العربية (Arabic)',
  french: 'Français (French)',
  chinese: '中文 (Chinese)'
};

export async function translateText(
  text: string,
  targetLang: string,
  sourceLang: string = 'en'
): Promise<string> {
  try {
    // Using LibreTranslate (free, open-source)
    const response = await fetch(LIBRE_TRANSLATE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text'
      })
    });

    if (!response.ok) {
      throw new Error('Translation failed');
    }

    const data = await response.json();
    return data.translatedText || text;
  } catch (error) {
    console.error('Translation error:', error);
    // Fallback: return original text with language indicator
    return `[${targetLang.toUpperCase()}] ${text}`;
  }
}

export async function translateInsight(
  title: string,
  summary: string,
  content: string,
  targetLang: string
): Promise<{ title: string; summary: string; content: string }> {
  try {
    const [translatedTitle, translatedSummary, translatedContent] = await Promise.all([
      translateText(title, targetLang),
      translateText(summary, targetLang),
      translateText(content, targetLang)
    ]);

    return {
      title: translatedTitle,
      summary: translatedSummary,
      content: translatedContent
    };
  } catch (error) {
    console.error('Insight translation error:', error);
    return { title, summary, content };
  }
}
