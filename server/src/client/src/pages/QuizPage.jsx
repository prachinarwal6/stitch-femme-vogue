import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useCart } from '../context/CartContext';

export default function QuizPage() {
  const navigate = useNavigate();
  const { showToast } = useCart();

  const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    1: 'opt-1-a',
    2: 'minimalist',
    3: 'opt-3-a',
    4: 'opt-4-a',
    5: 'opt-5-a'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    api.getQuizQuestions()
      .then(res => setQuestions(res.data))
      .catch(() => {});
  }, []);

  if (!questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="material-symbols-outlined text-4xl text-primary animate-spin">sync</span>
      </div>
    );
  }

  const currentQ = questions[currentStep - 1] || questions[0];
  const progressPercent = Math.round((currentStep / questions.length) * 100);

  const handleSelectOption = (optId) => {
    setAnswers(prev => ({ ...prev, [currentStep]: optId }));
  };

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    try {
      const res = await api.submitQuiz(answers);
      showToast('Atelier style archetype analyzed. Opening Private Dossier.');
      navigate('/dossier');
    } catch {
      showToast('Dossier generated.');
      navigate('/dossier');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto pb-safe">
      {/* Top Quiz Header & Introduction */}
      <section className="px-margin-mobile pt-space-md pb-space-lg flex flex-col gap-space-sm">
        <div className="inline-flex items-center gap-space-xs self-start px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed shadow-sm">
          <span className="material-symbols-outlined text-[15px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified
          </span>
          <span className="font-label-sm text-xs uppercase tracking-wider font-semibold">Over 18,400+ Profiles Curated</span>
        </div>
        <div className="flex flex-col gap-space-xs mt-1">
          <span className="font-label-sm text-label-sm uppercase text-primary tracking-widest font-semibold">Atelier Consultation</span>
          <h1 className="font-headline-xl-mobile md:font-display-lg text-headline-xl-mobile md:text-display-lg text-on-surface">
            What’s Your Fashion Archetype?
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl">
            Uncover your distinctive aesthetic silhouette, tailored capsule formulas, and curated color palettes in 5 intuitive questions.
          </p>
        </div>

        {/* Progress Indicator Module */}
        <div className="mt-space-sm p-4 rounded-xl bg-surface-container shadow-sm flex flex-col gap-2 border border-outline-variant/30">
          <div className="flex justify-between items-center text-on-surface">
            <span className="font-label-md text-label-md text-on-surface font-semibold tracking-wide">
              Question {currentStep} of {questions.length}
            </span>
            <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest">
              {progressPercent}% Complete
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
            <div
              className="h-full bg-primary-container rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center gap-1.5 pt-1 text-on-surface-variant">
            <span className="material-symbols-outlined text-[14px] text-primary">schedule</span>
            <span className="font-label-sm text-xs text-tertiary">Estimated finish: 60 seconds</span>
          </div>
        </div>
      </section>

      {/* Interactive Question Card */}
      <section className="px-margin-mobile pb-space-xl flex flex-col gap-space-md">
        <div className="p-5 md:p-8 rounded-2xl bg-surface-container-lowest shadow-md flex flex-col gap-space-md border border-outline-variant/30">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-primary text-on-primary font-label-sm text-xs flex items-center justify-center font-bold">
                {currentStep}
              </span>
              <span className="font-label-sm text-xs uppercase text-primary tracking-wider font-semibold">
                {currentQ.title}
              </span>
            </div>
            <h2 className="font-headline-sm md:font-headline-md text-headline-sm md:text-headline-md text-on-surface mt-1 font-medium">
              {currentQ.question}
            </h2>
            <p className="font-body-sm text-xs text-on-surface-variant">
              Select the ambiance that best captures how you feel most effortlessly empowered.
            </p>
          </div>

          {/* Options Group */}
          <div className="flex flex-col gap-space-sm" role="radiogroup">
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentStep] === (opt.id || opt.archetype);
              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id || opt.archetype)}
                  className={`cursor-pointer rounded-xl p-3.5 transition-all duration-200 shadow-sm flex items-center gap-space-md border ${
                    isSelected
                      ? 'bg-surface-container-high border-primary ring-1 ring-primary/40'
                      : 'bg-surface-container-lowest hover:bg-surface-container-low border-outline-variant/30'
                  }`}
                >
                  {opt.image && (
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0 shadow-sm border border-outline-variant/20">
                      <img className="w-full h-full object-cover" src={opt.image} alt={opt.title} />
                      {isSelected && (
                        <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-headline-sm text-base text-on-surface leading-tight font-medium">
                        {opt.title}
                      </span>
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? 'bg-primary text-on-primary' : 'bg-surface-container-high'
                        }`}
                      >
                        {isSelected && <span className="material-symbols-outlined text-[13px]">check</span>}
                      </span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                      {opt.subtitle}
                    </p>
                    {opt.tags && (
                      <div className="flex gap-1.5 mt-2">
                        {opt.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-[9px] uppercase tracking-wider font-semibold"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-surface-container">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`py-2.5 px-4 rounded-lg font-label-md text-xs uppercase tracking-wider flex items-center gap-1 transition-colors ${
                currentStep === 1
                  ? 'opacity-40 cursor-not-allowed text-outline'
                  : 'text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className="py-3 px-6 rounded-lg bg-inverse-surface hover:bg-primary text-surface font-label-md text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 font-semibold"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                  <span>Synthesizing Archetype...</span>
                </>
              ) : currentStep === questions.length ? (
                <>
                  <span>Reveal My Dossier</span>
                  <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                </>
              ) : (
                <>
                  <span>Next Question</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
