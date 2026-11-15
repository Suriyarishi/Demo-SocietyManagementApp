import React from 'react';
import { LucideIcon } from 'lucide-react';

// ==========================================
// 1. BUTTON COMPONENT (48-56dp Touch Targets)
// ==========================================
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'whatsapp' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'lg',
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  fullWidth = true,
  disabled,
  className = '',
  onClick,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(15);
      } catch (err) {
        // Silent catch for unsupported browsers
      }
    }
    if (onClick) onClick(e);
  };

  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-150 press-scale select-none focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const sizeStyles = {
    sm: 'h-10 px-3.5 text-xs tracking-wide',
    md: 'h-12 px-5 text-sm tracking-wide',
    lg: 'h-14 px-6 text-base tracking-wide', // 56dp primary thumb height
  };

  const variantStyles = {
    primary: 'bg-cobalt-600 hover:bg-cobalt-700 active:bg-cobalt-800 text-white shadow-sm focus:ring-cobalt-500 disabled:bg-slate-300 dark:disabled:bg-obsidian-800 disabled:text-slate-500 dark:disabled:text-slate-600 disabled:cursor-not-allowed',
    secondary: 'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-850 dark:bg-obsidian-800 dark:hover:bg-obsidian-750 dark:text-slate-100 border border-slate-200 dark:border-obsidian-700 focus:ring-slate-400',
    outline: 'border border-slate-300 dark:border-obsidian-700 hover:bg-slate-50 dark:hover:bg-obsidian-850 text-slate-700 dark:text-slate-200 focus:ring-cobalt-500',
    ghost: 'hover:bg-slate-100 dark:hover:bg-obsidian-800 text-slate-600 dark:text-slate-300 focus:ring-slate-400',
    danger: 'bg-crimson-600 hover:bg-crimson-700 active:bg-crimson-800 text-white shadow-sm focus:ring-crimson-500',
    success: 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-sm focus:ring-emerald-500',
    whatsapp: 'bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-white shadow-md shadow-[#25D366]/20 focus:ring-emerald-400',
    glass: 'glass-card hover:bg-white/90 dark:hover:bg-obsidian-800 text-slate-900 dark:text-white border-white/50 dark:border-white/15 shadow-md focus:ring-cobalt-400',
  };

  return (
    <button
      disabled={disabled || isLoading}
      onClick={handleClick}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span className="font-semibold">Securing...</span>
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2 font-bold tracking-tight">
          {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 16 : 20} strokeWidth={2.2} />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 16 : 20} strokeWidth={2.2} />}
        </span>
      )}
    </button>
  );
};

// ==========================================
// 2. INPUT COMPONENT (52dp Form Inputs)
// ==========================================
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  prefixElement?: React.ReactNode;
  suffixElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  prefixElement,
  suffixElement,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5 text-left group">
      {label && (
        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 tracking-wider uppercase flex items-center gap-1">
          {label}
        </label>
      )}
      <div className={`
        relative flex items-center h-[52px] rounded-2xl border transition-all duration-150 shadow-sm
        ${error 
          ? 'border-crimson-500 bg-crimson-50/30 dark:bg-crimson-950/20 text-crimson-900 dark:text-crimson-200 focus-within:ring-4 focus-within:ring-crimson-500/15' 
          : 'border-slate-200/90 dark:border-obsidian-750 bg-slate-50/80 dark:bg-obsidian-900/90 hover:bg-slate-100/60 dark:hover:bg-obsidian-850 focus-within:bg-white dark:focus-within:bg-obsidian-900 focus-within:border-cobalt-600 dark:focus-within:border-cobalt-500 focus-within:ring-4 focus-within:ring-cobalt-500/15'}
        ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-100 dark:bg-obsidian-850' : ''}
      `}>
        {prefixElement && (
          <div className="w-11 h-full flex items-center justify-center text-slate-400 dark:text-slate-500 group-focus-within:text-cobalt-600 dark:group-focus-within:text-cobalt-400 shrink-0 pointer-events-none transition-colors">
            {prefixElement}
          </div>
        )}
        <input
          disabled={disabled}
          className={`
            w-full h-full text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-semibold outline-none bg-transparent
            ${prefixElement ? 'pl-0 pr-4' : 'px-4'}
            ${suffixElement ? 'pr-12' : ''}
            ${className}
          `}
          {...props}
        />
        {suffixElement && (
          <div className="absolute right-3 flex items-center text-slate-400 dark:text-slate-500 group-focus-within:text-cobalt-600">
            {suffixElement}
          </div>
        )}
      </div>
      {error && (
        <span className="text-xs font-semibold text-crimson-600 dark:text-crimson-500 flex items-center gap-1 mt-0.5">
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </span>
      )}
      {!error && helperText && (
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          {helperText}
        </span>
      )}
    </div>
  );
};

// ==========================================
// 2B. TEXTAREA COMPONENT (Ergonomic Multiline)
// ==========================================
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = '',
  disabled,
  rows = 3,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5 text-left group">
      {label && (
        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 tracking-wider uppercase flex items-center gap-1">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        disabled={disabled}
        className={`
          w-full p-3.5 rounded-2xl border transition-all duration-150 shadow-sm text-sm font-semibold outline-none resize-none
          ${error
            ? 'border-crimson-500 bg-crimson-50/30 dark:bg-crimson-950/20 text-crimson-900 dark:text-crimson-200 focus:ring-4 focus:ring-crimson-500/15'
            : 'border-slate-200/90 dark:border-obsidian-750 bg-slate-50/80 dark:bg-obsidian-900/90 hover:bg-slate-100/60 dark:hover:bg-obsidian-850 focus:bg-white dark:focus:bg-obsidian-900 focus:border-cobalt-600 dark:focus:border-cobalt-500 focus:ring-4 focus:ring-cobalt-500/15 text-slate-900 dark:text-white placeholder:text-slate-400'}
          ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-100 dark:bg-obsidian-850' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-xs font-semibold text-crimson-600 dark:text-crimson-500 flex items-center gap-1 mt-0.5">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          {helperText}
        </span>
      )}
    </div>
  );
};

// ==========================================
// 2C. SELECT COMPONENT (Custom Styled Dropdown)
// ==========================================
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  prefixElement?: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  prefixElement,
  children,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5 text-left group">
      {label && (
        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 tracking-wider uppercase flex items-center gap-1">
          {label}
        </label>
      )}
      <div className={`
        relative flex items-center h-[52px] rounded-2xl border transition-all duration-150 shadow-sm
        ${error
          ? 'border-crimson-500 bg-crimson-50/30 dark:bg-crimson-950/20 text-crimson-900 focus-within:ring-4 focus-within:ring-crimson-500/15'
          : 'border-slate-200/90 dark:border-obsidian-750 bg-slate-50/80 dark:bg-obsidian-900/90 hover:bg-slate-100/60 dark:hover:bg-obsidian-850 focus-within:bg-white dark:focus-within:bg-obsidian-900 focus-within:border-cobalt-600 dark:focus-within:border-cobalt-500 focus-within:ring-4 focus-within:ring-cobalt-500/15'}
        ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-100 dark:bg-obsidian-850' : ''}
      `}>
        {prefixElement && (
          <div className="w-11 h-full flex items-center justify-center text-slate-400 dark:text-slate-500 group-focus-within:text-cobalt-600 shrink-0 pointer-events-none">
            {prefixElement}
          </div>
        )}
        <select
          disabled={disabled}
          className={`
            w-full h-full text-slate-900 dark:text-slate-100 text-sm font-semibold outline-none bg-transparent cursor-pointer
            ${prefixElement ? 'pl-0 pr-8' : 'px-4 pr-8'}
            ${className}
          `}
          {...props}
        >
          {children}
        </select>
        <div className="absolute right-4 pointer-events-none text-slate-400 dark:text-slate-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <span className="text-xs font-semibold text-crimson-600 dark:text-crimson-500 mt-0.5">
          {error}
        </span>
      )}
      {!error && helperText && (
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          {helperText}
        </span>
      )}
    </div>
  );
};

// ==========================================
// 3. BADGE COMPONENT (Architectural Status Tags)
// ==========================================
export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'cobalt' | 'amber' | 'crimson' | 'neutral' | 'purple' | 'glass';
  icon?: LucideIcon;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  icon: Icon,
  size = 'md',
}) => {
  const variantStyles = {
    emerald: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40',
    cobalt: 'bg-cobalt-50 text-cobalt-700 dark:bg-cobalt-950/60 dark:text-cobalt-400 border border-cobalt-200 dark:border-cobalt-800/40',
    amber: 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200 dark:border-amber-800/40',
    crimson: 'bg-crimson-50 text-crimson-700 dark:bg-crimson-950/60 dark:text-crimson-400 border border-crimson-200 dark:border-crimson-800/40',
    purple: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400 border border-purple-200 dark:border-purple-800/40',
    neutral: 'bg-slate-100 text-slate-700 dark:bg-obsidian-800 dark:text-slate-300 border border-slate-200 dark:border-obsidian-700',
    glass: 'glass-pill text-slate-800 dark:text-slate-100 border-white/60 dark:border-white/15 shadow-sm',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md font-semibold tracking-wide',
    md: 'text-xs px-2.5 py-1 rounded-lg font-bold tracking-wide',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 uppercase ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {Icon && <Icon size={size === 'sm' ? 12 : 14} strokeWidth={2.4} />}
      {children}
    </span>
  );
};

// ==========================================
// 4. STEP PROGRESS BAR (For Onboarding)
// ==========================================
export interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
}) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        <span>Step {currentStep} of {totalSteps}</span>
        {stepLabels && stepLabels[currentStep - 1] && (
          <span className="text-cobalt-600 dark:text-cobalt-400">{stepLabels[currentStep - 1]}</span>
        )}
      </div>
      <div className="w-full h-1.5 bg-slate-200 dark:bg-obsidian-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-cobalt-600 dark:bg-cobalt-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
