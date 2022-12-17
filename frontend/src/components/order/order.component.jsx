import { Box, ThemeProvider } from "@mui/material";
import ManageOrder from "../manageOrder/manageOrder.component";
import NavBar from "../navbar/navbar.component";
import { Provider } from 'react-redux';
import store from "../../store/store";
import theme from "../../utils/theme";

const Order = () => {
    return(
        <Provider store={store}>
            <ThemeProvider theme={theme}>
            <Box className="App" display="flex" height="100vh" flexDirection="column" sx={{
                    backgroundColor: theme.palette.background.main
            }}>
                    <NavBar />
                    <ManageOrder />
                </Box>
            </ThemeProvider>
        </Provider>            
    );
}

export default Order;