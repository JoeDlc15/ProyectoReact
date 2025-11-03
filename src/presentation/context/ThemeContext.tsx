import React, { createContext, PropsWithChildren } from "react";
import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { 
    PaperProvider, 
    MD3LightTheme, 
    MD3DarkTheme,
    configureFonts,
    adaptNavigationTheme 
} from 'react-native-paper';
import { useColorScheme } from "react-native";

const fontConfig = {
    fontFamily: 'System',
};

const paperLightTheme = {
    ...MD3LightTheme,
    fonts: configureFonts({ config: fontConfig }),
};

const paperDarkTheme = {
    ...MD3DarkTheme,
    fonts: configureFonts({ config: fontConfig }),
};

const { LightTheme: navLightTheme, DarkTheme: navDarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

export const ThemeContext = createContext({
    isDark: false,
    theme: paperLightTheme
});

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
    
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    
    const paperTheme = isDark ? paperDarkTheme : paperLightTheme;
    const navTheme = isDark ? navDarkTheme : navLightTheme;
    
    return (
        <PaperProvider theme={paperTheme}>  {/* Solo tema de Paper */}
            <NavigationContainer theme={navTheme}>  {/* Solo tema de Navigation */}
                <ThemeContext.Provider
                    value={{
                        isDark,
                        theme: paperTheme,  
                    }}>
                    {children}
                </ThemeContext.Provider>
            </NavigationContainer>
        </PaperProvider>
    );
};