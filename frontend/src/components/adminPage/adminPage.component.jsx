import { Box } from "@mui/material";
import React, {useEffect} from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { retrieveOrders } from "../../features/order/orders";

const AdminPage = () => {
      const dispatch = useDispatch();
      const orders = useSelector(state => state.orders);

      const initFetch = useCallback(() => {
            dispatch(retrieveOrders());
      }, []);

      useEffect(() => {
            initFetch()
      }, [initFetch]);

      return(
            <Box>
                  Lista de pedidos
                  {
                        
                  }
            </Box>
      );
}

export default AdminPage;