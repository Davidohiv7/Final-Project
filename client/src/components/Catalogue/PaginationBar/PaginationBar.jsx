import { useDispatch, useSelector } from "react-redux";
import { Pagination } from '@material-ui/lab';
import { getProducts } from '../../../actions/actions.js';

export default function PaginationBar() {

  const { pages, category, page, searched, order, filter } = useSelector((state) => ({ ...state }))

  const dispatch = useDispatch();

  function handelChange(e, value) {
    dispatch(getProducts({name: searched, category, order, filter, page: value}))
  }

  return (
    <>
      <Pagination 
        count={pages} 
        page={page} 
        onChange={handelChange} 
        color='primary'
        shape='rounded'
      />
    </>
  );
}