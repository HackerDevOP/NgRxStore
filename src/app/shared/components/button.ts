import { Component, computed, input } from "@angular/core";

// Expanded variants to include pink options
type ButtonVariant =
  | 'primary' | 'destructive' | 'secondary' | 'ghost' | 'link' | 'icon'
  | 'pink-soft' | 'pink-vivid' | 'pink-neon';

type ButtonSize = 'sm' | 'md' | 'lg';

const varientClasses: Record<ButtonVariant, string> = {
  primary: 'bg-black text-white hover:bg-zinc-800 focus:ring-black shadow-sm',
  destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm',
  secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 focus:ring-gray-200 shadow-sm',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-100',
  link: 'text-gray-600 underline-offset-4 hover:text-black hover:underline focus:ring-transparent',
  icon: 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-black focus:ring-gray-200 shadow-sm',

  // Pink Variants
  'pink-soft': 'bg-pink-100 text-pink-600 border border-pink-200 hover:bg-pink-200 focus:ring-pink-300 shadow-sm',
  'pink-vivid': 'bg-pink-500 text-white hover:bg-pink-600 focus:ring-pink-400 shadow-md shadow-pink-200',
  'pink-neon': 'bg-[#ff69b4] text-white hover:bg-[#ff1493] focus:ring-[#ff69b4] shadow-[0_0_15px_rgba(255,105,180,0.4)]'
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs font-medium rounded-full', // Switched to rounded-full for the pink aesthetic
  md: 'px-5 py-2.5 text-sm rounded-full',
  lg: 'px-8 py-3.5 text-base font-bold rounded-full'
}

@Component({
  selector: 'button[appButton], a[appButton]',
  standalone: true,
  template: '<ng-content/>',
  host: {
    '[class]': 'hostClasses()',
    '[attr.disabled]': 'disabled() || null',
    '[class.opacity-50]': 'disabled()',
    '[class.pointer-events-none]': 'disabled()'
  },
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input<boolean|undefined>(false);

  protected readonly hostClasses = computed(() => {
    const base = 'inline-flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-95 outline-none focus:ring-2 focus:ring-offset-2';
    const variantClass = varientClasses[this.variant()];
    const sizeClass = sizeClasses[this.size()];
    return `${base} ${variantClass} ${sizeClass}`;
  });
}
