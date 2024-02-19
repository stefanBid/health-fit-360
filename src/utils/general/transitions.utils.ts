// transitions.utils.ts

type TransitionType =
  | 'fade'
  | 'scaleAndFade'
  | 'verticalStretchDropdown'
  | 'topDownDropdown';

interface TransitionSettings {
  enterActiveClass: string;
  enterFromClass: string;
  enterToClass: string;
  leaveActiveClass: string;
  leaveFromClass: string;
  leaveToClass: string;
}

const transitionSettings: Record<string, TransitionSettings> = {
  fade: {
    enterActiveClass: 'transition duration-300 ease-out',
    enterFromClass: 'opacity-0',
    enterToClass: 'opacity-100',
    leaveActiveClass: 'transition duration-200 ease-in',
    leaveFromClass: 'opacity-100',
    leaveToClass: 'opacity-0',
  },
  scaleAndFade: {
    enterActiveClass: 'transition duration-200 ease-out',
    enterFromClass: 'transform scale-95 opacity-0',
    enterToClass: 'transform scale-100 opacity-100',
    leaveActiveClass: 'transition duration-200 ease-in',
    leaveFromClass: 'transform scale-100 opacity-100',
    leaveToClass: 'transform scale-95 opacity-0',
  },
  verticalStretchDropdown: {
    enterActiveClass: 'transition duration-300 ease-out',
    enterFromClass: 'transform scale-y-0 opacity-0',
    enterToClass: 'transform scale-y-100 opacity-100',
    leaveActiveClass: 'transition duration-200 ease-in',
    leaveFromClass: 'transform scale-y-100 opacity-100',
    leaveToClass: 'transform scale-y-0 opacity-0',
  },
  topDownDropdown: {
    enterActiveClass: 'transition duration-300 ease-out',
    enterFromClass: 'transform origin-top scale-y-0 opacity-0',
    enterToClass: 'transform origin-top scale-y-100 opacity-100',
    leaveActiveClass: 'transition duration-200 ease-in',
    leaveFromClass: 'transform origin-top scale-y-100 opacity-100',
    leaveToClass: 'transform origin-top scale-y-0 opacity-0',
  },
};

export const getTransition = (type: TransitionType): TransitionSettings =>
  transitionSettings[type];
