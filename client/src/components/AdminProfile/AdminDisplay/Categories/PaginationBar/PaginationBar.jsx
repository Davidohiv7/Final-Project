import { useDispatch, useSelector } from "react-redux";
import { Pagination } from '@material-ui/lab';
import { getCategories } from "../../../../../actions/admin/admin_actions";

export default function PaginationBar() {

  const { categoriesPage, categoriesPages } = useSelector(state => state.adminReducer)
  const dispatch = useDispatch();
  function handelChange(e, value) {
    dispatch(getCategories({ page:value }))
  }

  return (
    <>
      <Pagination 
        count={categoriesPages} 
        page={categoriesPage} 
        onChange={handelChange} 
        color='primary'
        shape='rounded'
      />
    </>
  );
}