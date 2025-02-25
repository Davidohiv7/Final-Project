import { useDispatch, useSelector } from "react-redux";
import { Pagination } from '@material-ui/lab';
import { getOrders } from "../../../../../actions/admin/admin_actions";

export default function PaginationBar() {

  const { orderPage, orderPages } = useSelector(state => state.adminReducer)
  const dispatch = useDispatch();
  function handelChange(e, value) {
    dispatch(getOrders({ page:value }))
  }

  return (
    <>
      <Pagination 
        count={orderPages} 
        page={orderPage} 
        onChange={handelChange} 
        color='primary'
        shape='rounded'
      />
    </>
  );
}