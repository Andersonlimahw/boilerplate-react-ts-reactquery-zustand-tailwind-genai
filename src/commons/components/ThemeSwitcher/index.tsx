import { Palette } from "@phosphor-icons/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useStoreHook } from "../../../store/hooks/use-store";
import { EActionType } from "../../../store/flux";

export const THEME_OPTIONS = [
    'dark', 'light', 'green', 'blue', 'purple', 'red', 'yellow', 'pink'
];

export const ThemeSwitcher = () => {
    const useStore = useStoreHook((state: any) => state);
    const { dispatch } = useStore;

    function handleThemeChange(theme: string) {
        dispatch({
            type: EActionType.SET_THEME,
            payload: {
                theme: {
                    type: theme
                }
            }
        })
    }

    return (
        <DropdownMenu.Root data-testid="theme_switcher_container">
            <DropdownMenu.Trigger asChild>
                <button className="ml-5 flex" aria-label="Theme switcher">
                    <Palette color="#f1f1f1" size={32} />
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
                <DropdownMenu.Content className="flex flex-col flex-wrap py-4 pl-2 bg-zinc-900 hover:shadow-lg" sideOffset={5}>
                    {
                        THEME_OPTIONS.map((themeItem) => (
                            <DropdownMenu.Item 
                                className="cursor-pointer p-3 inline-block flex-1 hover:shadow-lg hover:font-bold"
                                onClick={() => handleThemeChange(themeItem)}
                                key={themeItem}
                            >
                                {themeItem}
                            </DropdownMenu.Item>

                        ))
                    }
                    <DropdownMenu.Arrow className="bg-zinc-900" />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );


}