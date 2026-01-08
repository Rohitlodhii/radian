import { useState, useEffect } from 'react';
import { generateSpeech, getAudioUrl } from '../services/api';

// English voices from the table (all 20 voices)
export const ENGLISH_VOICES = [
  { name: "Emma", value: "af_heart", sex: "F ♀️" },
  { name: "Bella", value: "af_bella", sex: "F ♀️" },
  { name: "Nicole", value: "af_nicole", sex: "F ♀️" },
  { name: "Skylar", value: "af_sky", sex: "F ♀️" },

  { name: "Adam", value: "am_adam", sex: "M ♂️" },
  { name: "Samuel", value: "am_santa", sex: "M ♂️" },
  { name: "Michael", value: "am_michael", sex: "M ♂️" },
  { name: "Lucas", value: "am_puck", sex: "M ♂️" },
];


// Hindi voices
export const HINDI_VOICES = [
  { name: "Aarohi", value: "hf_alpha", sex: "F ♀️" },
  { name: "Kavya", value: "hf_beta", sex: "F ♀️" },
  { name: "Rohan", value: "hm_omega", sex: "M ♂️" },
  { name: "Arjun", value: "hm_psi", sex: "M ♂️" },
];


// Spanish voices
export const SPANISH_VOICES = [
  { name: "Dora", value: "ef_dora", sex: "F ♀️" },
  { name: "Alejandro", value: "em_alex", sex: "M ♂️" },
  { name: "Santiago", value: "em_santa", sex: "M ♂️" },
];

// French voices
export const FRENCH_VOICES = [
  { name: "Élodie", value: "ff_siwis", sex: "F ♀️" },
];


// Italian voices
export const ITALIAN_VOICES = [
  { name: "Sara", value: "if_sara", sex: "F ♀️" },
  { name: "Nicola", value: "im_nicola", sex: "M ♂️" },
];

// Portuguese voices
export const PORTUGUESE_VOICES = [
  { name: "Dora", value: "pf_dora", sex: "F ♀️" },
  { name: "Alexandre", value: "pm_alex", sex: "M ♂️" },
  { name: "Thiago", value: "pm_santa", sex: "M ♂️" },
];


export default function TTSGenerator() {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState<'en' | 'hi' | 'es' | 'fr' | 'it' | 'pt'>('en');
  const [voice, setVoice] = useState('af_heart');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioFilename, setAudioFilename] = useState<string | null>(null);

  // Get voices for current language
  const getVoicesForLanguage = () => {
    switch (language) {
      case 'en':
        return ENGLISH_VOICES;
      case 'hi':
        return HINDI_VOICES;
      case 'es':
        return SPANISH_VOICES;
      case 'fr':
        return FRENCH_VOICES;
      case 'it':
        return ITALIAN_VOICES;
      case 'pt':
        return PORTUGUESE_VOICES;
      default:
        return ENGLISH_VOICES;
    }
  };

  // Update voice when language changes
  useEffect(() => {
    switch (language) {
      case 'en':
        setVoice(ENGLISH_VOICES[0].value);
        break;
      case 'hi':
        setVoice(HINDI_VOICES[0].value);
        break;
      case 'es':
        setVoice(SPANISH_VOICES[0].value);
        break;
      case 'fr':
        setVoice(FRENCH_VOICES[0].value);
        break;
      case 'it':
        setVoice(ITALIAN_VOICES[0].value);
        break;
      case 'pt':
        setVoice(PORTUGUESE_VOICES[0].value);
        break;
      default:
        setVoice(ENGLISH_VOICES[0].value);
    }
  }, [language]);

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError('Please enter some text');
      return;
    }

    setLoading(true);
    setError(null);
    setAudioUrl(null);
    setAudioFilename(null);

    try {
      const response = await generateSpeech({
        text: text.trim(),
        language,
        voice,
      });

      const url = getAudioUrl(response.file);
      setAudioUrl(url);
      setAudioFilename(response.file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate audio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl  w-full mx-auto p-6 space-y-6">
      <div className=" mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Radian</h1>
        <p className="">Convert your text into natural-sounding speech</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        {/* Text Input */}
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Text
          </label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your text here..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={5}
            disabled={loading}
          />
        </div>

        {/* Language and Voice Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'en' | 'hi' | 'es' | 'fr' | 'it' | 'pt')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="it">Italian</option>
              <option value="pt">Portuguese</option>
            </select>
          </div>

          <div>
            <label htmlFor="voice" className="block text-sm font-medium text-gray-700 mb-2">
              Voice
            </label>
            <select
              id="voice"
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            >
              {getVoicesForLanguage().map((voiceOption) => (
                <option key={voiceOption.value} value={voiceOption.value}>
                  {voiceOption.name} · {voiceOption.sex}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={loading || !text.trim()}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            'Generate Speech'
          )}
        </button>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Audio Player */}
        {audioUrl && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Generated Audio</h3>
              {audioFilename && (
                <span className="text-xs text-gray-500 font-mono">{audioFilename}</span>
              )}
            </div>
            <audio controls className="w-full" src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
            <div className="mt-3">
              <a
                href={audioUrl}
                download={audioFilename || 'audio.wav'}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Audio
              </a>
            </div>
          </div>
        )}
      </div>
      {/* Secondary actions */}
  
    </div>
  );
}

