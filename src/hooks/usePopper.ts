//usePopper.ts

import { ref } from 'vue';
import {
  useFloating,
  flip,
  shift,
  autoUpdate,
  offset,
  arrow,
} from '@floating-ui/vue';
import type { Placement } from '@floating-ui/dom';

type PopperType = 'dropdownMenu' | 'helpInfo' | 'combobox';

// This helper function is used to configure the popper settings for each popper type in complete security
const configurePopperSetting = (
  placement: Placement,
  offsetValue: number,
  hasArrow: boolean,
) => ({
  placement,
  offsetValue,
  hasArrow,
});

const popperSettings = {
  dropdownMenu: configurePopperSetting('bottom-end', 4, false),
  helpInfo: configurePopperSetting('top', 10, true),
  combobox: configurePopperSetting('bottom', 4, false),
};

export function usePopper(popperType: PopperType) {
  const anchor = ref();
  const popper = ref();
  const popperArrow = ref();
  const isOpen = ref();

  const { floatingStyles, placement } = useFloating(anchor, popper, {
    open: isOpen,
    placement: popperSettings[popperType].placement,
    strategy: 'absolute',
    transform: false,
    middleware: [
      offset(popperSettings[popperType].offsetValue),
      flip(),
      shift(),
      ...(popperSettings[popperType].hasArrow
        ? [arrow({ element: popperArrow })]
        : []),
    ],
    whileElementsMounted: autoUpdate,
  });

  const changeToolTipVisibility = (state: 'open' | 'close') => {
    if (state === 'open') {
      isOpen.value = true;
    } else {
      isOpen.value = false;
    }
  };

  return {
    anchor,
    popper,
    popperArrow,
    isOpen,
    popperPosition: placement,
    popperStyle: floatingStyles,
    changeToolTipVisibility,
  };
}
