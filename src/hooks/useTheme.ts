// useTheme.ts
import { useDark, useToggle } from '@vueuse/core';

export function useTheme() {
	const isDark = useDark();
	const toggleTheme = useToggle(isDark);

	return {
		isDark,
		toggleTheme,
	};
}
