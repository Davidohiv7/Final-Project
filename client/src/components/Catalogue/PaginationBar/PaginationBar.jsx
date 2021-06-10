import { useDispatch, useSelector } from "react-redux";
import { Pagination } from '@material-ui/lab';
import { getProducts } from '../../../actions/actions.js';

export default function PaginationBar() {

  const { pages, nextPage, page } = useSelector((state) => ({ ...state }))

  const dispatch = useDispatch();

  function handelChange(e, value) {
    dispatch(getProducts({name: null, category: null, filter: 'name', order: 'ASC', page: value}))
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