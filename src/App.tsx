import "react-native-gesture-handler";

import { StacksNavigator } from "./presentation/navigator/StacksNavigator";
import { ThemeContextProvider } from "./presentation/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BottomTabsNavigator } from "./presentation/navigator/BottomTabsNavigator";

const queryClient = new QueryClient();
export const App = () => {
    return (      
      <QueryClientProvider client={queryClient}>        
        <ThemeContextProvider>  
            {/*<StacksNavigator />*/}
            <BottomTabsNavigator />
        </ThemeContextProvider>
      </QueryClientProvider>
    );
};